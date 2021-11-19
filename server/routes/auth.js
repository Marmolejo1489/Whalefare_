const express = require('express');
const router = express.Router();
const passport = require('passport');


//Función - Registro de usuario

router.post('/signup', (req, res, next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true,
    })(req, res, next);
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    }
});

//Función - Comprobación de sesión

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

//Función - Inicio de sesión

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

//Función - Cierre de sesión

router.post('/logout', (req, res) => {
    req.logOut();
    req.session.destroy;
    res.clearCookie('userId');
    req.session.user = null;
    res.send({ loggedIn: false, user: null });
    console.log('sesión cerrada')
});

//Función - Datos de la sesión

router.get('/profile', (req, res) => {

    const path = require('path')


    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });

    }

});

module.exports = router;