const {
    graphql,
    GraphQLID,
} = require('graphql');
const RoomType = require('./../../../types/room');
const knex = require('./../../../../knexInstance');

const room = {
    type: RoomType,
    args: { id: { type: GraphQLID}},
    resolve(parentValue, args) {
      return knex.select("*").from("room").where({id: args.id}).first();
    }
}

module.exports = room;