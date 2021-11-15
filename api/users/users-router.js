const express= require('express')
const {checkUnTakenRegister,
        providedUnPw}=require('./users-middleware')
const Users = require('./users-model')
const router = express.Router()
const bcrypt=require('bcryptjs')
router.get('/',(req,res,next)=>{
    Users.getUsers()
    .then(users=>{
        res.status(202).json(users)
    })
    .catch(next)
})

router.post('/', providedUnPw,checkUnTakenRegister,(req, res, next)=>{
    const {username,password}=req.body
    const hash=bcrypt.hashSync(password,8)
    Users.register({username,password:hash})
        .then(newUser=>{
            res.status(201).json(newUser)
        })
        .catch(next)
})
module.exports = router

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })
