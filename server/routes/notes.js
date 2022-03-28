const express = require('express');
const router = express.Router();
const pool = require('../database');

/*
router.get('/devtest', (req, res) => {
    console.log('Dev enviroment working')
    res.send({hola: 'hola'})
});
*/

//Función - Agregar
router.post('/addnote', (req, res) => {
    var { title_n, content_n, id_u, category_n } = req.body;

    /*
    Cifrar content
    const passobj = {
        password: pass_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    const key_c = hashedPassword.iv;
    */
    const newNote = {
        title_n,
        content_n,
        id_u,
        category_n
    };
    console.log('añadir nota', newNote);
    if (newNote.id_u !== null) {
        pool.query("INSERT INTO note set ?", [newNote],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Success");
                }
            });
    }
});

//Función - Listar
router.post('/readnote', async (req, res) => {
    const { id_u } = req.body;
    const authorized = await pool.query('SELECT authorized_u FROM user WHERE id_u = ?', [id_u]);
    /*console.log(authorized[0].authorized_u)
    
        cambiar el if a 
        authorized[0].authorized_u === 1 
        para deploy
        */
    if (1 === 1) {
        /*
        descomentar para deploy
        */
        pool.query("SELECT * FROM note WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
    } else {
        console.log("False en creditcard /read")
        /*
        pool.query("SELECT number_t FROM password WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
            */
    }
});

/*Función - Desencriptar
router.post('/decryptpass', (req, res) => {
    const pass = {
        iv: req.body.iv,
        password: req.body.password
    }
    res.send(decrypt(pass));
});
*/

//Función - Editar
router.put('/editnote/:id_n', async (req, res) => {

    const { id_n } = req.params;
    var { title_n, content_n, category_n } = req.body;
    /*
    const key_c = iv[0].key_c;
    const iv = await pool.query('SELECT key_c FROM password WHERE id_c = ?', [id_c]);
    
    const passobj = {
        password: pass_c,
        iv: key_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    */

    const newNote = {
        title_n,
        content_n,
        category_n
    };
    await pool.query('UPDATE note set ? WHERE id_n = ?', [newNote, id_n]);
});

//Función - Borrar
router.delete('/deletenote/:id_n', async (req, res) => {
    const { id_n } = req.params;
    await pool.query('DELETE FROM note WHERE id_n = ?', [id_n]);
});

module.exports = router;