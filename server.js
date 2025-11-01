const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', (req, res)=>{ 
    res.send("hello how can i help you");
})

//Import the router files of person
const personRoutes = require('./routes/personRoutes');

//use the routes of person
app.use('/person', personRoutes);

//import the router files of menu
const menuRoutes = require('./routes/menuRoutes');

//use the routes of menu
app.use('/menuItems', menuRoutes)

app.listen(3001, ()=>{
    console.log('listening on port 3001');
})