const db = require('../data/db-config')

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

module.exports={
    addItem
}