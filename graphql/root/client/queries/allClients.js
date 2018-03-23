const {
    graphql,
    GraphQLList,
} = require('graphql');
const ClientType = require('./../../../types/client');
const knex = require('./../../../../knexInstance');

const allClients = {
    type: GraphQLList(ClientType),
    resolve() {
      return knex.select("*").from("client").whereNotNull('id');
    }
};

module.exports = allClients;