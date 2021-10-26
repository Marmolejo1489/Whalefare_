const express = require('express');
const pool = require('../database');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
    
});

router.post('/signup', (req, res)=>{
    const { user_u, pass_u, email_u } = req.body;
    const newUser = {
        user_u: user_u,
        pass_u: pass_u,
        email_u: email_u
    }

    pool.query("INSERT INTO user set ?", [newUser],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Success");
        }
    });
})

module.exports = router;