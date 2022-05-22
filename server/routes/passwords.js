const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require('../database');

const { encrypt, decrypt } = require('../Encryption');

//Envío de correo - verificación

const correo = (url, email) => {
    console.log(email)
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: 'gmail',
        secure: true,
        auth: {
            user: 'carapiaaguilar.krishna@gmail.com',
            pass: 'Krishna01.'
        },
    })

    var mailOptions = {
        from: '"Whalefare" <carapiaaguilar.krishna@gmail.com>',
        to: email,
        subject: 'Verifica tu identidad',
        html: 'Hola:<br><br> Una contraseña fue añadida recientemente en tu cuenta Whalefare.<br>Si fuiste tú, haz clic <a href="' + url + '" target="_blank">aquí</a> para verificar tu identidad; <br>si no, quizá deberías asegurarte de que no haya problemas en el paraíso.<br><br> Saludos cordiales, Krishna. ¿Problemas con el vínculo? <br><br>Accede aquí: ' + url + '.'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("El email no se envió", error)
        } else {
            console.log("email enviado")
        }
    })
}

//Envío del correo para permitir el acceso a readauth

router.post('/jwtauth/:id', async (req, res) => {
    const id = req.params.id
    const array = await pool.query('SELECT * FROM user WHERE id_u = ?', [id]);
    console.log(array)
    const authorized = array[0].authorized_u;
    const email = array[0].email_u;
    console.log("Respuesta del query en auth ->", array, "ID en userId -> ", id)
    if (array[0].verified_u) {
        if (authorized === true) {
            console.log('Diferente de null')
            res.send({ authorization: true, message: 'unverified' });
        } else {
            console.log("El email no existe")
            const token = jwt.sign({ id }, "jwtAuthorization", {
                expiresIn: 600
            })
            res.cookie('authorizationtoken', token, {
                secure: true,
                httpOnly: true,
                maxAge: 10 * 60 * 1000,
            })
            req.session.jwtauth = token;
            const url = ("https://whalefare1.herokuapp.com/authorization/" + token)
            correo(url, array[0].email_u);
            res.send({ authorization: false, message: 'unverified' });
        }
    } else {
        console.log("No estás autenticado")
        res.send({ authorization: false, message: 'id', verified: false });
    }
});

//JWT check

router.get("/authorization/:token", (req, res) => {
    console.log("Llegamos a authorization :D")
    try {
        const token = req.params.token;
        if (token) {
            jwt.verify(token, "jwtAuthorization", async (err, decoded) => {
                if (err) {
                    res.json({ isAuth: false })
                } else {
                    req.userId = decoded.id
                    await pool.query('UPDATE user set ? WHERE id_u = ?', [{ authorized_u: true }, req.userId]);
                    console.log(req.userId)
                    //res.redirect('https://whalefare.netlify.app/home')
                }
            })
        }
    } catch (e) {

    }
})

//Función - Agregar contraseñas
router.post('/add', (req, res) => {
    var { user_c, pass_c, website_c, id_u, title_c } = req.body;
    const passobj = {
        password: pass_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    const key_c = hashedPassword.iv;
    const newPass = {
        title_c,
        user_c,
        pass_c,
        website_c,
        key_c,
        id_u
    };

    if (newPass.id_u !== null) {
        pool.query("INSERT INTO password set ?", [newPass],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Success");
                }
            });
    }
});

//Función - Listar contraseñas
router.post('/read', async (req, res) => {
    const { id_u } = req.body;
    const authorized = await pool.query('SELECT authorized_u FROM user WHERE id_u = ?', [id_u]);
    console.log(authorized[0].authorized_u)
    if (authorized[0].authorized_u === 1) {
        console.log("True en password /read")
        pool.query("SELECT * FROM password WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
    } else {
        console.log("False en passwords /read")
        pool.query("SELECT title_c FROM password WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
    }
});

//Función - Mostrar contraseñas
router.post('/decryptpass', (req, res) => {
    const pass = {
        iv: req.body.iv,
        password: req.body.password
    }
    res.send(decrypt(pass));
});

//Función - Editar contraseñas
router.put('/edit/:id_c', async (req, res) => {

    const { id_c } = req.params;
    const iv = await pool.query('SELECT key_c FROM password WHERE id_c = ?', [id_c]);
    const key_c = iv[0].key_c;
    var { user_c, pass_c, website_c, title_c } = req.body;
    const passobj = {
        password: pass_c,
        iv: key_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;

    const newPass = {
        title_c,
        user_c,
        pass_c,
        website_c,
        id_c
    };
    await pool.query('UPDATE password set ? WHERE id_c = ?', [newPass, id_c]);
});

//Función - Borrar contraseñas
router.delete('/delete/:id_c', async (req, res) => {
    const { id_c } = req.params;
    await pool.query('DELETE FROM password WHERE id_c = ?', [id_c]);
});

//Función - Agregar tarjeta
router.post('/addcard', (req, res) => {
    var { owner_t, number_t, id_u, cvv_t, cad_t } = req.body;

    /*
    Cifrar number, cvv & cad
    const passobj = {
        password: pass_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    const key_c = hashedPassword.iv;
    */
    const newCard = {
        owner_t,
        number_t,
        cad_t,
        cvv_t,
        id_u
    };
    console.log('añadir tarjeta', newCard);
    if (newCard.id_u !== null) {
        pool.query("INSERT INTO creditcard set ?", [newCard],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Success");
                }
            });
    }
});

//Función - Listar tarjeta
router.post('/readcard', async (req, res) => {
    const { id_u } = req.body;
    const authorized = await pool.query('SELECT authorized_u FROM user WHERE id_u = ?', [id_u]);
    /*console.log(authorized[0].authorized_u)
    
        cambiar el if a 
        authorized[0].authorized_u === 1 
        para deploy
        */
    if (authorized[0].authorized_u === 1) {
        /*
        descomentar para deploy
        */
        pool.query("SELECT * FROM creditcard WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result)
                    res.send({ result, authorized });
                }
            });
    } else {
        console.log("False en creditcard /read passwords.js")
        res.send({ authorized });
    }
});

//Función - Editar tarjeta
router.put('/editcard/:id_t', async (req, res) => {

    const { id_t } = req.params;
    var { owner_t, number_t, cvv_t, cad_t } = req.body;
    /*
    const key_c = iv[0].key_c;
    const iv = await pool.query('SELECT key_c FROM password WHERE id_c = ?', [id_c]);
    
    const passobj = {
        password: pass_c,
        iv: key_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    */

    const newCard = {
        owner_t,
        number_t,
        cad_t,
        cvv_t
    };
    await pool.query('UPDATE creditcard set ? WHERE id_t = ?', [newCard, id_t]);
});

//Función - Borrar tarjeta
router.delete('/deletecard/:id_t', async (req, res) => {
    const { id_t } = req.params;
    await pool.query('DELETE FROM creditcard WHERE id_t = ?', [id_t]);
});

//Función - Agregar nota
router.post('/addnote', (req, res) => {
    var { title_n, content_n, id_u, id_nc } = req.body;

    /*
    Cifrar content
    const passobj = {
        password: pass_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    const key_c = hashedPassword.iv;
    */
    const newNote = {
        title_n,
        content_n,
        id_u,
        id_nc
    };
    console.log('añadir nota', newNote);
    if (newNote.id_u !== null) {
        pool.query("INSERT INTO note set ?", [newNote],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Success");
                }
            });
    }
});

//Función - Listar nota
router.post('/readnote', async (req, res) => {
    const { id_u } = req.body;
    const authorized = await pool.query('SELECT authorized_u FROM user WHERE id_u = ?', [id_u]);
    /*console.log(authorized[0].authorized_u)
    
        cambiar el if a 
        authorized[0].authorized_u === 1 
        para deploy
        */
    if (authorized[0].authorized_u === 1) {
        /*
        descomentar para deploy
        */
        pool.query("SELECT * FROM note WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
    } else {
        console.log("False en creditcard /read")
        /*
        pool.query("SELECT number_t FROM password WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
            */
        res.send({ authorized });
    }
});

//Función - Editar nota
router.put('/editnote/:id_n', async (req, res) => {

    const { id_n } = req.params;
    var { title_n, content_n, id_nc } = req.body;
    /*
    const key_c = iv[0].key_c;
    const iv = await pool.query('SELECT key_c FROM password WHERE id_c = ?', [id_c]);
    
    const passobj = {
        password: pass_c,
        iv: key_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    */

    const newNote = {
        title_n,
        content_n,
        id_nc
    };
    await pool.query('UPDATE note set ? WHERE id_n = ?', [newNote, id_n]);
});

//Función - Borrar nota
router.delete('/deletenote/:id_n', async (req, res) => {
    const { id_n } = req.params;
    await pool.query('DELETE FROM note WHERE id_n = ?', [id_n]);
});

//Función - Agregar categoría
router.post('/addcategory', (req, res) => {
    var { color_nc, name_nc, id_u } = req.body;

    const newCategory = {
        color_nc,
        name_nc,
        id_u
    };
    console.log('añadir categoría de nota', newCategory);
    if (newCategory.id_u !== null) {
        pool.query("INSERT INTO note_category set ?", [newCategory],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Success");
                }
            });
    }
});

//Función - Listar categoría
router.post('/readcategory', async (req, res) => {
    const { id_u } = req.body;
    const authorized = await pool.query('SELECT authorized_u FROM user WHERE id_u = ?', [id_u]);
    /*console.log(authorized[0].authorized_u)
    
        cambiar el if a 
        authorized[0].authorized_u === 1 
        para deploy
        */
    if (1 === 1) {
        /*
        descomentar para deploy
        */
        pool.query("SELECT * FROM note_category WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
    } else {
        console.log("False en creditcard /read")
        /*
        pool.query("SELECT number_t FROM password WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
            */
        res.send({ authorized });
    }
});

//Función - Editar categoría
router.put('/editcategory/:id_nc', async (req, res) => {

    const { id_nc } = req.params;
    var { name_nc, color_nc } = req.body;

    const newCategory = {
        name_nc,
        color_nc
    };
    await pool.query('UPDATE note_category set ? WHERE id_nc = ?', [newCategory, id_nc]);
});

//Función - Borrar categoría
router.delete('/deletecategory/:id_nc', async (req, res) => {
    const { id_nc } = req.params;
    await pool.query('DELETE FROM note_category WHERE id_nc = ?', [id_nc]);
});

module.exports = router;