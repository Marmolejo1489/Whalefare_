const express = require('express');
const pool = require('../database');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer')
const helpers = require('../lib/helpers')

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
        subject: 'Verifica tu cuenta',
        html: 'Hola:<br>Una cuenta de Whalefare asociada a este correo fue creada recientemente.<br>Si fuiste tú, haz clic <a href="' + url + '" target="_blank">aquí<a> para verificar tu cuenta;<br>si no, quizá deberías asegurarte de que no haya problemas en el paraíso.<br>Saludos cordiales, Krishna. <br>¿Problemas con el vínculo?<br>Accede aquí:' + url + '.'
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("El email no se envió", error)
        } else {
            console.log("email enviado")
        }
    })
}

//Función - Registro de usuario

router.post('/signup', (req, res, next) => {
    try {
        passport.authenticate('local.signup', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true,
        })(req, res, next);

    } catch (e) {
        console.log(e)
    }
    console.log("Req.session signup -> ", req.session)
    if (req.session.user) {
        console.log(req.session.user)
    } else {
        res.send({ message: "Error", loggedIn: false })
    }
});

//Función - Comprobación de sesión

router.get('/login', (req, res) => {
    console.log("Get Login", req.session)
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

//Función - Inicio de sesión

router.post('/login', async (req, res, next) => {
    const array = await pool.query('SELECT id_u, verified_u FROM user WHERE email_u = ?', [req.body.email]);
    let user = null;
    console.log("Respuesta del query login ->", array)
    if (array[0]) {
        if (array[0].verified_u === 1) {
            console.log('Diferente de null')
            passport.authenticate('local.login', {
                successRedirect: '/',
                failureRedirect: '/',
                failureFlash: true,
            }, function () {
                console.log("User en login passport auth->", req.session.user)
                res.send({ isLogged: req.session.isLogged, id: req.session.user.id_u });
            })(req, res, next);

        } else {
            const id = array[0].id_u;
            const token = jwt.sign({ id }, "jwtVerification", {
                expiresIn: 600
            })
            res.cookie('verificationtoken', token, {
                secure: true,
                httpOnly: true,
                maxAge: 10 * 60 * 1000,
            })
            req.session.jwt = token;
            const url = ("https://whalefare1.herokuapp.com/confirmation/" + token)

            correo(url, req.body.email);

            console.log("No estás verificado")
            res.send({ loggedIn: false, message: 'unverified' });
        }
    } else {
        res.send({ loggedIn: false, message: 'email', verified: false });
    }
});



//Función - Cierre de sesión

router.post('/logout/:id_u', async (req, res) => {
    const id = req.params.id_u
    console.log(id)
    await pool.query('UPDATE user set ? WHERE id_u = ?', [{ authorized_u: false }, id]);
    req.logOut();
    req.session.destroy();
    res.clearCookie('userId');
    res.clearCookie('secrettoken');
    res.clearCookie('authorizationtoken');
    req.session = null;
    res.send({ loggedIn: false, user: null });
    console.log('sesión cerrada')
});

//Función - Datos de la sesión

router.get('/profile/:id_u', async (req, res) => {
    console.log(req.params)
    const id = req.params.id_u
    if (id !== 0) {
        const user = await pool.query('SELECT email_u, user_u from user WHERE id_u = ?', [id]);
        res.send({ loggedIn: true, user: { email: user[0].email_u, user: user[0].user_u } });
    } else {
        res.send({ loggedIn: false });
    }
});

//Petición - Verificación de JWT

router.get('/jwt', (req, res) => {
    console.log("/jwt working")
    const token = req.session.jwtsecret;
    res.cookie('secrettoken', token, {
        secure: true,
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
    })
    if (token) {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ isAuth: false })
            } else {
                req.userId = decoded.id
                console.log("id del usuario ->", req.userId)
                res.send({ isAuth: true, id: req.userId })
                next();
            }
        })
    } else {
        res.send({ isAuth: false, id: null })
    }

})

//Envío de correo - verificación

router.get("/confirmation/:token", (req, res) => {
    console.log("Llegamos a confirmation :D")
    try {
        const token = req.params.token;
        if (token) {
            jwt.verify(token, "jwtVerification", async (err, decoded) => {
                if (err) {
                    res.json({ isAuth: false })
                } else {
                    req.userId = decoded.id
                    console.log(req.userId)
                    await pool.query('UPDATE user set ? WHERE id_u = ?', [{ verified_u: true }, req.userId]);
                }
            })
        }
    } catch (e) {

    }
})

//Editar usuario 
router.put('/profileedit/:id_u', async (req, res) => {

    const { id_u } = req.params;
    const { password, user, email } = req.body;
    const array = await pool.query('SELECT * FROM user WHERE id_u = ?', [id_u]);
    const validPassword = await helpers.matchPassword(password, array[0].pass_u);
    const validEmail = await pool.query('SELECT id_u FROM user WHERE email_u = ?', [email])
    console.log(validEmail)

    let newUser = {}
    if (validPassword) {
        console.log("Verified password")
        if (validEmail[0] === id_u) {
            console.log("same email")
            if (user && email) {
                newUser = {
                    email_u: email,
                    user_u: user
                };
            } else if (email) {
                newUser = {
                    email_u: email
                };
            } else if (user) {
                newUser = {
                    user_u: user
                };
            }
            console.log(newUser)
            await pool.query('UPDATE user SET ? WHERE id_u = ?', [newUser, id_u]);
            return { message: 'success' }
        } else {
            console.log("different email")
            if (user && email) {
                newUser = {
                    email_u: email,
                    user_u: user,
                    verified_u: false
                };
            } else if (email) {
                newUser = {
                    email_u: email,
                    verified_u: false
                };
            } else if (user) {
                newUser = {
                    user_u: user,
                    verified_u: false
                };
            }
            console.log(newUser, "Usuario actualizado")
            await pool.query('UPDATE user SET ? WHERE id_u = ?', [newUser, id_u]);
            return { message: 'success' }
        }

    } else {
        return { message: 'password' }
    }
});

module.exports = router;