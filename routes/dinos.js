//mounted at '/dinos'

const express = require('express');
const router = express.Router();
const fs = require('fs');



//index - get route
router.get('/', (req, res) => {
    // to do get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    console.log(dinoData);


    res.render('dinos/index', { dinos: dinoData });
});

// new -- get route
router.get('/new', (req, res) => {
    res.render('dinos/new');
});

//create -- post route
router.post('/', (req, res) => {
    console.log(req.body);

    //read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    //json parse dinos
    let dinoData = JSON.parse(dinos);
    //add req body to end of dinos
    dinoData.push(req.body);
    //json 
    let newDinos = JSON.stringify(dinoData);
    //write dinos
    fs.writeFileSync('./dinosaurs.json', newDinos);


    res.redirect(`/dinos/${dinoData.length - 1}`);

})

//show -- get route
router.get('/:id', (req, res) => {
    //todo get actual at id of req.params.id
    
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/show', { dino: oneDino });
});

// edit -- get
router.get('/edit/:id', (req, res) => {
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.param.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/edit', { dino: oneDino });
});

// update -- put
router.put('/:id', (req,res) => {
    console.log(req.body);
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    dino[parseInt(req.params.id)] = req.body;

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect('dinos/${req.param.id}');
})
 
// destroy -- delete
router.delete('/:id', (req, res) => {
  //read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
//json parse
    dinos = JSON.parse(dinos);
    // remove from index array
    let deadDino = dinos.splice(req.params.id, 1);
//write json stringify version of dino
fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

console.log('press F to pay respects to ${ deadDino[0].name }');
    res.redirect('/dinos');
});


module.exports = router;