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
router.post('/addcard', (req, res) => {
    var { owner_t, number_t, id_u, cvv_t, cad_t } = req.body;

    /*
    Cifrar number, cvv & cad
    const passobj = {
        password: pass_c
    }

    const hashedPassword = encrypt(passobj);
    pass_c = hashedPassword.password;
    const key_c = hashedPassword.iv;
    */
    const newCard = {
        owner_t,
        number_t,
        cad_t,
        cvv_t,
        id_u
    };
    console.log('añadir tarjeta', newCard);
    if (newCard.id_u !== null) {
        pool.query("INSERT INTO creditcard set ?", [newCard],
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
router.post('/readcard', async (req, res) => {
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
        pool.query("SELECT * FROM creditcard WHERE id_u = ?", [id_u],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ result, authorized });
                }
            });
    } else {
        console.log("False en creditcard /read creditcards.js")
        /*
        pool.query("SELECT number_t FROM creditcard WHERE id_u = ?", [id_u],
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
router.put('/editcard/:id_t', async (req, res) => {

    const { id_t } = req.params;
    var { owner_t, number_t, cvv_t, cad_t } = req.body;
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

    const newCard = {
        owner_t,
        number_t,
        cad_t,
        cvv_t
    };
    await pool.query('UPDATE creditcard set ? WHERE id_t = ?', [newCard, id_t]);
});

//Función - Borrar
router.delete('/deletecard/:id_t', async (req, res) => {
    const { id_t } = req.params;
    await pool.query('DELETE FROM creditcard WHERE id_t = ?', [id_t]);
});

module.exports = router;