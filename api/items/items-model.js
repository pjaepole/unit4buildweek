const db = require('../data/db-config')

function finditemfortheuser(user_id){
    return db('items').where({user_id})
}

function findBy(filter) {
    return db('items').where(filter).first()
  }

function addItem(user_id, item){
    return db('items')
    .insert({
        ...item,
        user_id
    })
    .then(()=>{
        return db('items')
        .join('users', 'users.user_id','items.user_id')
        .select('item_id','item_name','item_description','item_price','users.username')
        .orderBy('item_id','desc')
        .where('users.user_id',user_id)
    })
}

async function removeItem(item_id){
    const result = await db('items').where({item_id}).first()
    const removed= await db('items').where('item_id',item_id).del()
    return result
   
    // return db('items').where({item_id}).del()
      
}

function updateItem(changes,item_id) {
    return db('items')
      .where({ item_id })
      .update(changes)
    //   .then(result => {
    //     return result
    //   })
      .then(count => {
        return findBy({item_id})
      })
  }
module.exports={
    addItem,
    removeItem,
    findBy,
    finditemfortheuser,
    updateItem
}


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