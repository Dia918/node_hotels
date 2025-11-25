const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

//post route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body //assuming the req body contains the person data

        //create a new person data using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server Error'});
    }
})

//Login Route
router.post('/login', async(req, res) => {
    try{
        //Extract username and password from request body
        const {username, password} = req.body;

        //Find the user by username
        const user = await Person.findOne({username: username});

        //If user does not existor password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate Token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        //resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//get method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server Error'})
    }
})

//get method for worktype
router.get('/:workType', async (req, res) =>{
    try{
        const workType = req.params.workType;
        if(workType == 'Chef' || workType == 'Waiter' || workType == 'Manager'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'internal server error'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.put('/:id', async (req, res) =>{
    try{
        const personId = req.params.id; //extract id from url parameter
        const updatedPersonData = req.body; //updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,//return the updated document
            runValidators: true //run the mongoose validation
        })
        
        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
    
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;

        //assuming you have person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
           return res.status(404).json({ error: 'person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'person Deleted successfully'});
       } 
       catch(err){
        console.log(err);
        res.status(500).json({ error: 'internal server error'});
    }
    
})

module.exports = router;