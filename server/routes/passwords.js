const express = require('express');
const router = express.Router();
const pool = require('../database');

const { encrypt, decrypt } = require('../Encryption');

//Página de inicio

//Función - Agregar
router.post('/add', (req, res) => {
    var { user_c, pass_c, website_c, id_u } = req.body;
    const hashedPassword = encrypt(pass_c);
    pass_c = hashedPassword.password;
    const key_c = hashedPassword.iv;
    const newUser = {
        user_c,
        pass_c,
        website_c,
        key_c,
        id_u
    };

    pool.query("INSERT INTO password set ?", [newUser],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Success");
            }
        });

});

//Función - Listar
router.post('/home', (req, res) => {
    const { id_u } = req.body;
    pool.query("SELECT * FROM password WHERE id_u = ?", [id_u],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


//Función - Mostrar
router.post('/decryptpass', (req, res) => {
    res.send(decrypt(req.body));
});

module.exports = router;