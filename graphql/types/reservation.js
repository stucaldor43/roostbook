const {
    graphql,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = require('graphql');
const RoomType = require('./room');

const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: {
      id: { type: GraphQLID },
      start_date: { type: GraphQLString },
      end_date: { type: GraphQLString },
      fk_room_id: { type: GraphQLInt },
      fk_client_id: { type: GraphQLInt},
      booked_room:  {
        type: RoomType,
        resolve(parentValue, args) {
          return knex.select("room.*").from('reservations').innerJoin('room', 'reservations.fk_room_id', 'room.id')
          .where('reservations.id' , parentValue.id).first();
        }
      }
    }
});

module.exports = ReservationType;