const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const array = await pool.query('SELECT * FROM user WHERE email_u = ?', [username]);
    if (array.length > 0) {
        req.session.user = array;
        req.session.cookie.expires = false
        const user = array[0];
        const validPassword = helpers.matchPassword(password, user.pass_u);
        if (validPassword) {
            console.log('Bienvenido ' + user.user_u)
            done(null, false, { message: 'Bienvenido ' + user.user_u });
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

    const newUser = {
        user_u: req.body.username,
        pass_u: req.body.password,
        email_u: req.body.email
    };
    newUser.pass_u = await helpers.encryptPassword(req.body.password);
    const result = await pool.query('INSERT INTO user set ?', [newUser]);
    req.session.user = newUser;
    req.session.cookie.expires = false
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const array = await pool.query('SELECT * FROM user WHERE id_u = ?', [id]);
    done(null, array[0]);
});
