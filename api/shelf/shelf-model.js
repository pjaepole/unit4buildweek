const db=require('../data/db-config')
async function getAllItems(){
    const allItems = await db('items as i')
        .join('users as u', 'i.user_id','u.user_id')
        .select('item_id','item_name','item_description','item_price','u.username')
    return allItems
}


module.exports={
    getAllItems
}