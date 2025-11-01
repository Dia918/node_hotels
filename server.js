const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3001;

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


app.listen(PORT, ()=>{
    console.log('listening on port 3001');
})