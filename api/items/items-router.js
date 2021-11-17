const express = require('express')
const Items = require('./items-model')
const router= express.Router()
const {checkIfTryingToChangeItemIdorUserId,
       checkifPriceisbelowzero}
       =require('./items-middleware')
router.get('/itemsforuser/:user_id', (req,res,next)=>{
    Items.finditemfortheuser(req.params.user_id)
        .then(allItemOwnedByUser=>{
            res.status(200).json(allItemOwnedByUser)
        })
        .catch(next)
})
router.post('/:user_id/items', checkifPriceisbelowzero,(req, res, next)=>{
    const item=req.body
    const {user_id}= req.params
    Items.addItem(user_id,item)
        .then(allItemsByUser=>{
            res.status(201).json({message:"this user have items listed below",addedItem:allItemsByUser[0],allItemsByUser})
        })
        .catch(next)
})
router.put('/updateitem/:item_id',checkIfTryingToChangeItemIdorUserId,checkifPriceisbelowzero, (req,res,next)=>{
    const changes=req.body
    Items.updateItem(changes,req.params.item_id)
    .then(updatedItem=>{
        if(updatedItem){
            res.status(200).json(updatedItem)
        } else {
            res.json({message:"there are no item with that id to update"})
        }
    })
    .catch(next)
})
router.delete('/deleteitem/:item_id', (req, res, next)=>{
    const{item_id}=req.params

    Items.removeItem(item_id)
    .then(item=>{
        if(item){
            res.json({message:`item_id ${item_id} is removed`, removed:item})
        }
        else{
            res.status(404).json({message:"Could not find any item with provided item_id"})
        }
    })
    .catch(next)
})
module.exports= router