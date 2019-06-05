const {
  graphql,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');
const Room = require('./../../../types/room');
const knex = require('./../../../../knexInstance');

const createRoom = {
  type: Room,
  args: { 
    accommodate: { type: GraphQLInt },
    room_type: { type: GraphQLString },
    description: { type: GraphQLString },
    baths: { type: GraphQLInt },
    beds: { type: GraphQLInt },
    price: { type: GraphQLInt },
    lat: { type: GraphQLFloat },
    long: { type: GraphQLFloat }
  },
  async resolve(parentValue, { accommodate, room_type, description, baths, beds, price, lat, long }) {
    const insertedRows = await knex('room').insert({
      guest_limit: accommodate,
      style: room_type,
      description,
      bath_count: baths,
      bed_count: beds,
      price,
      latitude: lat,
      longitude: long
    }, ['id', 'guest_limit', 'style', 'description', 'bath_count', 'bed_count', 'price', 'latitude', 'longitude']);
    return insertedRows[0];
  }
}

module.exports = createRoom;