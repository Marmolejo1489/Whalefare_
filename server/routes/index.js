const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (request, response) => {
    console.log("/")
    response.send({Prueba: 'Prueba?'})
    response.redirect('https://whalefare.netlify.app')
});

module.exports = router;