const express= require('express')

const Users = require('./users-model')
const router = express.Router()

router.get('/',(req,res,next)=>{
    Users.getUsers()
    .then(users=>{
        res.status(202).json(users)
    })
    .catch(next)
})
router.post('/', (req, res, next)=>{
    const UserData=req.body
    Users.register(UserData)
        .then(newUser=>{
            res.status(201).json(newUser)
        })
        .catch(next)
})
module.exports = router