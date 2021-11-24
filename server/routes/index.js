const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (request, response) => {
    console.log("/")
    response.send({Prueba: 'Prueba?'})
});

module.exports = router;