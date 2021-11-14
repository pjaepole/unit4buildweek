const db=require('../data/db-config')
async function getAllItems(){
    const allItems = await db('items').select('item_id','item_name','item_description','item_price')
    return allItems
}
module.exports={
    getAllItems
}