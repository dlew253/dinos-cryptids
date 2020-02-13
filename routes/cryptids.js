const express = require('express');
const router = express.Router();
const fs = require('fs');

//index --get
router.get('/', (req, res) => {
    let allCryptids = fs.readFileSync('./cryptids.json');
    let cryptidData = JSON.parse(allCryptids);
    console.log(cryptidData);

    res.render('cryptids/index', { cryptids: cryptidData });
});

//new --get
router.get('/', (req, res) => {

    res.render('cryptids/new');
});

//create -- post
router.post('/', (req, res) => {
    console.log(req.body);
    let cryptids = fs.readFileSync('./cryptids.json');
    let cryptidData = JSON.parse(cryptids);
    cryptidData.push(req.body);
    let newCryptids = JSON.stringify(cryptidData);
    fs.writeFileSync('./cryptids.json', newCryptids);

    res.redirect(`/cryptids/${cryptidData.length - 1}`);
});
////if error will be here

// show -- get
router.get('/:id', (req, res) => {

    let cryptids = fs.readFileSync('./cryptids.json');
    let cryptidData = JSON.parse(cryptids);
    let cryptidIndex = parseInt(req.params.id);
    let oneCryptid = cryptidData[cryptidIndex];
    oneCryptid.id = cryptidIndex;

    res.render('cryptids/show', { cryptid: oneCryptid });
});


//edit -- get
router.get('/edit/:id', (req, res) => {

    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    let cryptidIndex = parseInt(req.param.id);
    let oneCryptid = cryptids[cryptidIndex];
    oneCryptid.id = cryptidIndex;

    res.render('cryptids/edit', { cryptid: oneCryptid });
});


//update -- put
router.put('/:id', (req,res) => {
    console.log(req.body);
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    cryptid[parseInt(req.params.id)] = req.body;

    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    res.redirect('cryptids/${req.param.id}');
})
 


//destroy -- delete
router.delete('/:id', (req, res) => {

      let cryptids = fs.readFileSync('./cryptids.json');
      cryptids = JSON.parse(cryptids);
      let deadCryptid = cryptids.splice(req.params.id, 1);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
  
  console.log('press F to pay respects to ${ deadCryptid[0].name }');
      res.redirect('/cryptids');
  });







module.exports = router;