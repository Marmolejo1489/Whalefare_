//Dependencias
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Inicialización
const app = express();

//Configuración
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(session({
    key: "userId",
    secret: 'ProyectoDeKrishna',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 14 * 24 * 3600000
    },
}));
app.use(express.json());
app.use(flash());

//Rutas
app.use(require('./routes'));
app.use(require('./routes/sessions'));
app.use(require('./routes/passwords'));

//Variables globales
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto: ', app.get('port'))
});