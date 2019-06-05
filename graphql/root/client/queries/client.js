const {
    graphql,
    GraphQLID,
} = require('graphql');
const ClientType = require('./../../../types/client');
const knex = require('./../../../../knexInstance');

const client = {
    type: ClientType,
    args: { id: { type: GraphQLID }},
    async resolve(parentValue, args) {
      return await knex.select("*").from("client").where({id: args.id}).first();
    }
};

module.exports = client;