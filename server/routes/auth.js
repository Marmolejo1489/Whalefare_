const express = require('express');
const pool = require('../database');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer')

//Envío de correo

const correo = (url, email) => {
    console.log(email)
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'carapiaaguilar.krishna@gmail.com',
            pass: 'Cheche21.'
        },
    })

    var mailOptions = {
        from: '"Whalefare" <carapiaaguilar.krishna@gmail.com>',
        to: email,
        subject: 'Confirma tu dirección de email',
        html: 'Ayúdanos a mantener tu cuenta de Whalefare a salvo confirmando que esta es tu dirección de email. <br> <a href="' + url + '"> Confirmar dirección email</a><br><br>Si necesitas más información nos puedes contactar.<br><br>-Whalefare'
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
        if (array[0].verified_u !== null) {
            console.log('Diferente de null')
            passport.authenticate('local.login', {
                successRedirect: '/',
                failureRedirect: '/',
                failureFlash: true,
            }, function () {
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
            const url = ("http://localhost:4000/confirmation/" + token)

            correo(url, req.body.email);

            console.log("No estás verificado")
            res.send({ loggedIn: false, message: 'unverified' });
        }
    } else {
        res.send({ loggedIn: false, message: 'email', verified: false });
    }
});



//Función - Cierre de sesión

router.post('/logout', async (req, res) => {
    
    console.log(req.session.user.id_u)
    await pool.query('UPDATE user set ? WHERE id_u = ?', [{ authorized_u: false }, req.session.user.id_u]);
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

router.get('/profile', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

//Función - Verificación de JWT

const verifyJWT = (req, res, next) => {
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
                next();
            }
        })
    } else {
        res.json({ isAuth: false })
    }
}

//Petición - Verificación de JWT

router.get('/jwt', verifyJWT, (req, res) => {
    res.send({ isAuth: true, id: req.userId })
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

module.exports = router;