const {
    graphql,
    GraphQLList,
} = require('graphql');
const RoomType = require('./../../../types/room');
const knex = require('./../../../../knexInstance');

const allRooms = {
    type: GraphQLList(RoomType),
    resolve() {
      return knex.select("*").from("room").whereNotNull('id');
    }
}

module.exports = allRooms;