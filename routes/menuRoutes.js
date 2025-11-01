const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem');

//post route to add menu items
router.post('/', async (req, res) => {
    try{
        const data = req.body;

        const newMenuItem = new MenuItem(data);
        
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

//get route to get all menu items
router.get('/', async (req, res)=>{
    try{
        const data =  await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server Error'})
    }
})

//get route to get only taste wise food
router.get('/:tasteType', async (req, res) =>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'sour' || taste == 'spicy'){
            const response = await MenuItem.find({taste: tasteType});
            console.log('data fetched');
            res.status(200).json(response);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const itemId = req.params.id;
        const upadatedItem = req.body;

        const response = await MenuItem.findByIdAndUpdate(itemId, upadatedItem, {
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: 'item not found'});
        }
        console.log('item is updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }

})

router.delete('/:id', async (req, res) => {
    try{
        const itemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(itemId);
        if(!response){
            return res.status(404).json({ error: 'item not found'});
        }
        console.log('item deleted');
        res.status(200).json(response);

        
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router;