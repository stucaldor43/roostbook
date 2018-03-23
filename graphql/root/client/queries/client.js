const {
    graphql,
    GraphQLID,
} = require('graphql');
const ClientType = require('./../../../types/client');
const knex = require('./../../../../knexInstance');

const client = {
    type: ClientType,
    args: { id: { type: GraphQLID }},
    resolve(parentValue, args) {
      return knex.select("*").from("client").where({id: args.id}).first();
    }
};

module.exports = client;