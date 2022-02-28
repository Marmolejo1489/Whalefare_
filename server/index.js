//Dependencias
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session');

const { database } = require('./keys')
//Inicialización
const app = express();
require('./lib/passport')

//Configuración
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors({
    origin: ["https://whalefare.netlify.app", "https://whalefare1.herokuapp.com"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    key: "userId",
    secret: 'ProyectoDeKrishna',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
    cookie: {
        expires: false,

    },
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.json());
app.use(flash());

//Rutas
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use(require('./routes/passwords'));

//Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto: ', app.get('port'))
});