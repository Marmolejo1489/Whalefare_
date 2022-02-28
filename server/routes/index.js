const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (request, response) => {
    response.redirect('https://whalefare.netlify.app')
});

module.exports = router;