const express = require('express')

const Shelf = require('./shelf-model')
const router = express.Router()

router.get('/',(req,res,next)=>{
    Shelf.getAllItems()
    .then(allItems=>{
        res.status(202).json(allItems)
    })
    .catch(next)
})

module.exports = router