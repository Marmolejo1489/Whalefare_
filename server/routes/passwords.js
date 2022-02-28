const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require('../database');

const { encrypt, decrypt } = require('../Encryption');

//Envío de correo

const correo = (url, email) => {
    console.log(email)
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
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

//Correo para permitir el acceso a readauth

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
                }
            })
        }
    } catch (e) {

    }
})

//Función - Agregar
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

//Función - Listar
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

//Función - Mostrar
router.post('/decryptpass', (req, res) => {
    const pass = {
        iv: req.body.iv,
        password: req.body.password
    }
    res.send(decrypt(pass));
});

//Función - Editar
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

//Función - Borrar
router.delete('/delete/:id_c', async (req, res) => {
    const { id_c } = req.params;
    await pool.query('DELETE FROM password WHERE id_c = ?', [id_c]);
});

module.exports = router;