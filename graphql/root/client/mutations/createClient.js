const {
    graphql,
    GraphQLString,
} = require('graphql');
const ClientType = require('./../../../types/client');
const knex = require('./../../../../knexInstance');

const createClient = {
    type: ClientType,
    args: { 
      name: { type: GraphQLString },
      email_address: { type: GraphQLString }
    },
    async resolve(parentValue, {name, email_address}) {
      const insertedRows = await knex('client').insert({name, email_address}, ['id', 'name', 'email_address']);
      return insertedRows[0];
    }
}

module.exports = createClient;