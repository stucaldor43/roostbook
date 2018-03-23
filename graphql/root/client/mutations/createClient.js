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
    resolve(parentValue, {name, email_address}) {
      return knex('client').insert({name, email_address});
    }
}

module.exports = createClient;