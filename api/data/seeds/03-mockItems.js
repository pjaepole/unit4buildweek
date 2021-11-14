exports.seed = function (knex) {
  return knex('items').insert([
    { item_name: 'snapple', item_description:'snap',item_price:'4.45', user_id:3},
    { item_name: 'snap', item_description:'asdf',item_price:'0.45', user_id:2},
    { item_name: 'foo', item_description:'snqwerap',item_price:'45', user_id:1},
  ])
}
