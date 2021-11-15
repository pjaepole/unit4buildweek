const express = require('express')
const Items = require('./items-model')
const router= express.Router()

router.post('/:user_id/items', (req, res, next)=>{
    const item=req.body
    const {user_id}= req.params
    Items.addItem(user_id,item)
        .then(allItemsByUser=>{
            res.status(201).json({message:"this user have items listed below",allItemsByUser})
        })
        .catch(next)
})

module.exports= router