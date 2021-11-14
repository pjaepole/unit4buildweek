const db=require('../data/db-config')
async function getUsers(){
    const users = await db('users').select('username')
    return users
}
async function register(user){
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject 
}

async function findBy(filter){
    const [existing]= await db('users').where(filter)
    return existing
}
module.exports={
register,
getUsers,
findBy
}