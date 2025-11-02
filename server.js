const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3001;

//Middleware function
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //move to the next phase
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false}) 

app.get('/', (req, res)=>{ 
    res.send("hello how can i help you");
})

//Import the router files of person
const personRoutes = require('./routes/personRoutes');

//use the routes of person
app.use('/person', localAuthMiddleware,  personRoutes);

//import the router files of menu
const menuRoutes = require('./routes/menuRoutes');

//use the routes of menu
app.use('/menuItems',  menuRoutes)


app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`listening on port 3001 || Server is running on port ${PORT}`);
});