const express = require('express')
const Items = require('./items-model')
const router= express.Router()

router.post('/:user_id/items', (req, res, next)=>{
    const item=req.body
    const {user_id}= req.params
    Items.addItem(user_id,item)
        .then(allItemsByUser=>{
            res.status(201).json({message:"this user have items listed below",addedItem:allItemsByUser[0],allItemsByUser})
        })
        .catch(next)
})

router.delete('/deleteitem/:item_id', (req, res, next)=>{
    const{item_id}=req.params

    Items.removeItem(item_id)
    .then(item=>{
        if(item){
            res.json({message:`item_id:${item_id} is removed`, removed:item})
        }
        else{
            res.status(404).json({message:"Could not find any item with provided item_id"})
        }
    })
    .catch(next)
})
module.exports= router