const {
    graphql,
    GraphQLString,
    GraphQLInt,
} = require('graphql');
const ReservationType = require('./../../../types/reservation');
const knex = require('./../../../../knexInstance');

const createReservation = {
    type: ReservationType,
    args: { 
      start_date: { type: GraphQLString },
      end_date: { type: GraphQLString },
      fk_room_id: { type: GraphQLInt },
      fk_client_id: { type: GraphQLInt }
    },
    resolve(parentValue, {start_date, end_date, fk_room_id, fk_client_id}) {
      return knex('reservations').insert({start_date, end_date, fk_room_id, fk_client_id});
    }
}

module.exports = createReservation;