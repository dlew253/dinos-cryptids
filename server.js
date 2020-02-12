const express = require('express');
const layouts = require('express-ejs-layouts');

const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
//routes here
app.get('/', (req, res) => {
    res.render('home');
});


// import controller
app.use('/dinos', require('./routes/dinos'));


app.listen(3000, () => console.log('listen to my ass'));