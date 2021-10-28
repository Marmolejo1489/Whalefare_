const express = require('express');
const pool = require('../database');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', (req, res) => {
    const { user_u, pass_u, email_u } = req.body;

    bcrypt.hash(pass_u, saltRounds, (err, hash) => {

        if (err) { console.log(err); }
        const newUser = {
            user_u: user_u,
            pass_u: hash,
            email_u: email_u
        }
        pool.query("INSERT INTO user set ?", [newUser],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Success");
                }
            });
    });
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post('/login', (req, res) => {
    const { pass_u, email_u } = req.body;
    pool.query("SELECT * FROM user where email_u = ?", email_u, (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            bcrypt.compare(pass_u, result[0].pass_u, (err, response) => {
                if (response) {
                    req.session.user = result;
                    res.send(result);
                    console.log(result)
                } else {
                    res.send({ message: "Las credenciales son erróneas." });
                }
            });
        } else {
            res.send({ message: "El correo electrónico ingresado no está registrado." });
        }



    })

})

router.post('/logout', (req, res) => {
    
        res.clearCookie('userId');
        res.send({ loggedIn: false });
        console.log('sesión cerrada')
    
});

module.exports = router;