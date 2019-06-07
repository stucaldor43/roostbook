const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat
} = require('graphql');
const RoomType = require('./../../../types/room');
const knex = require('./../../../../knexInstance');

const filterRoomsByLatLong = {
  type: GraphQLList(RoomType),
  args: {
    first: { type: GraphQLNonNull(GraphQLInt) },
    offset: { type: GraphQLNonNull(GraphQLInt) },
    styles: { type: GraphQLList(GraphQLString)},
    guest_limit: { type: GraphQLInt},
    bed_count: { type: GraphQLInt},
    bath_count: { type: GraphQLInt},
    minLatitude: { type: GraphQLNonNull(GraphQLFloat) },
    maxLatitude: { type: GraphQLNonNull(GraphQLFloat) },
    minLongitude: { type: GraphQLNonNull(GraphQLFloat) },
    maxLongitude: { type: GraphQLNonNull(GraphQLFloat) }
  },
  async resolve(parentValue, {first, offset, styles, guest_limit, bed_count, bath_count, minLatitude, maxLatitude, minLongitude, maxLongitude}) {
    const total = Number((await knex('room')
      .whereIn('style', ['house', 'entire', 'private', 'shared'])
      .whereBetween('latitude', [minLatitude, maxLatitude])
      .whereBetween('longitude', [minLongitude, maxLongitude])
      .whereBetween('guest_limit', [isNaN(guest_limit) ? 0 : guest_limit, 1000000])
      .whereBetween('bed_count', [isNaN(bed_count) ? 0 : bed_count, 1000000])
      .whereBetween('bath_count', [isNaN(bath_count) ? 0 : bath_count, 1000000])
      .count('id')
      .first()).count);
      
    const rooms =  await knex('room')
      .whereIn('style', ['house', 'entire', 'private', 'shared'])
      .whereBetween('latitude', [minLatitude, maxLatitude])
      .whereBetween('longitude', [minLongitude, maxLongitude])
      .whereBetween('guest_limit', [isNaN(guest_limit) ? 0 : guest_limit, 1000000])
      .whereBetween('bed_count', [isNaN(bed_count) ? 0 : bed_count, 1000000])
      .whereBetween('bath_count', [isNaN(bath_count) ? 0 : bath_count, 1000000])
      .limit(first)
      .offset(offset)
    
    return rooms;
  }
}

module.exports = filterRoomsByLatLong;