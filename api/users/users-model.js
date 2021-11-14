const db=require('../data/db-config')

async function register(user){
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject 
}
module.exports={
register,
}