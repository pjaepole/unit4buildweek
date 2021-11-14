exports.seed = function (knex) {
  return knex('users').insert([
    { username: 'snapple', password:'snap' },
    { username: 'socrates', password:'1234'},
    { username: 'admin',password:'admin'},
  ])
}
