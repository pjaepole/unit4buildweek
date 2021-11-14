const express= require('express')

const Users = require('./users-model')
const router = express.Router()

router.post('/', (req, res, next)=>{
    const UserData=req.body
    Users.register(UserData)
        .then(newUser=>{
            res.status(201).json(newUser)
        })
        .catch(err=>{
            next(err)
        })
})
module.exports = router