//mounted at '/dinos'

const express = require('express');
const router = express.Router();
const fs = require('fs');
//index - get route
router.get('/', (req, res) => {
    // to do get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    console.log(allDinos);

    
    res.render('dinos/index', { dinos: [] });
});

// new -- get route
router.get('/new', (req, res) => {
    res.render('dinos/new');
});

//create -- post route


//show -- get route
router.get('/:id', (req, res) => {
    //todo get actual at id of req.params.id

    res.render('dinos/show', { dino: { id: req.params.id } })
});


// edit -- get
router.get('/edit/:id', (req, res) => {
    res.render('dinos/edit', { dino: { id: req.params.id } })
});

// update -- put


// destroy -- delete



module.exports = router;