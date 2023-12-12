const express = require('express');
const router = express.Router();

const getAllDB = require('../database');

router.get('/:fname-:lname', (req, res, next) => {
    console.log('Handler invoked: ', req.params.fname, ' & ', req.params.lname);
    const str = `Welcome ${req.params.fname} ${req.params.lname}`;

    getAllDB().then((data) => {
        res.send(`${str}  List of databases are : \n ${data}`);
    }).catch((err) => {
        res.send(`${str}  Error in fetching resposnse form the DB: ${err}`);
    });

});

module.exports = router;
