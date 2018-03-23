const Knex = require("knex");
const knexOptions = require('./knexfile');
const knex = Knex(knexOptions);

module.exports = knex;