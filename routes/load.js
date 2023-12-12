const express = require('express');
const router = express.Router();

let counter = 0;

router.get('/', (req, res, next) => {
    console.log('Load GET ', ++counter);
    // setTimeout(() => {
        res.send(`Load received: ${counter}`);
    // }, 10000);
});

router.get('/clear', (req, res, next) => {
    counter = 0;
    res.send(`OK ${counter}`);
});


module.exports = router;