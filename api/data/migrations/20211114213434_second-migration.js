exports.up = async (knex)=> {
    await knex.schema
    .createTable('items', (table) => {
      table.increments('item_id')
      table.string('item_name', 200).notNullable().unique()
      table.string('item_description', 200)
      table.decimal('item_price',8,2).notNullable().unsigned()
      table.integer('user_id')
        
        .references('user_id')
        .inTable('users')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })
};

exports.down = async(knex)=> {
    await knex.schema.dropTableIfExists('items')
};
