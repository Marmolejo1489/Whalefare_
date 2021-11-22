const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const array = await pool.query('SELECT * FROM user WHERE email_u = ?', [username]);
    console.log(array)
    if (array.length > 0) {
        const user = await array[0];
        const validPassword = await helpers.matchPassword(password, user.pass_u);
        if (validPassword) {
            console.log('Bienvenido ' + user.user_u)
            console.log(validPassword)
            req.session.isLogged = true;
            req.session.user = user;
            console.log(req.session.user)
            const id = array[0].id_u;
            console.log(id)
            const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 600
            })
            req.session.jwtsecret = token;
            req.session.cookie.expires = 600000

            done(null, user, { message: 'Bienvenido ' + user.user_u });
        } else {
            console.log("Contraseña incorrecta")
            done(null, false, { message: 'Usuario inválido' });
        }
    } else {
        console.log("El usuario no existe")
        return done(null, false, { message: 'Usuario inválido' });
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

    passReqToCallback: true
}, async (req, username, password, done) => {
    const array = await pool.query('SELECT id_u FROM user WHERE email_u = ?', [req.body.email]);
    if (array[0]) {
        console.log('Correo usado')
        return ({ message: 'Correo usado' });
    } else {
        const newUser = {
            user_u: req.body.username,
            pass_u: req.body.password,
            email_u: req.body.email
        };
        newUser.pass_u = await helpers.encryptPassword(req.body.password);
        const result = await pool.query('INSERT INTO user set ?', [newUser]);
        newUser.id = result.insertId;
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const array = await pool.query('SELECT * FROM user WHERE id_u = ?', [id]);
    done(null, array[0]);
});
