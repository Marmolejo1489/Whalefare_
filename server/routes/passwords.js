const express = require('express');
const router = express.Router();
const pool = require('../database');

const { encrypt, decrypt } = require('../Encryption');

//Página de inicio

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

    pool.query("INSERT INTO password set ?", [newPass],
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
    console.log(req.body)
    res.send(decrypt(req.body));
});

//Función - Editar
router.post('/edit/:id_c', async (req, res) => {

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
router.post('/delete/:id_c', async (req, res) => {
    const { id_c } = req.params;
    await pool.query('DELETE FROM password WHERE id_c = ?', [id_c]);
});

module.exports = router;