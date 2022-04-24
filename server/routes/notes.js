const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/devtest', (req, res) => {
    console.log('Dev enviroment working')
    res.redirect('http://localhost:3000')
});


/*
Notas
*/

//Función - Agregar
router.post('/addnote', (req, res) => {
    var { title_n, content_n, id_u, id_nc } = req.body;

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
        id_nc
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
    if (authorized[0].authorized_u === 1) {
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

//Función - Editar
router.put('/editnote/:id_n', async (req, res) => {

    const { id_n } = req.params;
    var { title_n, content_n, id_nc } = req.body;
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
        id_nc
    };
    await pool.query('UPDATE note set ? WHERE id_n = ?', [newNote, id_n]);
});

//Función - Borrar
router.delete('/deletenote/:id_n', async (req, res) => {
    const { id_n } = req.params;
    await pool.query('DELETE FROM note WHERE id_n = ?', [id_n]);
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

/*
Categorías
*/

//Función - Agregar
router.post('/addcategory', (req, res) => {
    var { color_nc, name_nc, id_u } = req.body;

    const newCategory = {
        color_nc,
        name_nc,
        id_u
    };
    console.log('añadir categoría de nota', newCategory);
    if (newCategory.id_u !== null) {
        pool.query("INSERT INTO note_category set ?", [newCategory],
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
router.post('/readcategory', async (req, res) => {
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
        pool.query("SELECT * FROM note_category WHERE id_u = ?", [id_u],
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

//Función - Editar
router.put('/editcategory/:id_nc', async (req, res) => {

    const { id_nc } = req.params;
    var { name_nc, color_nc } = req.body;

    const newCategory = {
        name_nc,
        color_nc
    };
    await pool.query('UPDATE note_category set ? WHERE id_nc = ?', [newCategory, id_nc]);
});

//Función - Borrar
router.delete('/deletecategory/:id_nc', async (req, res) => {
    const { id_nc } = req.params;
    await pool.query('DELETE FROM note_category WHERE id_nc = ?', [id_nc]);
});

module.exports = router;