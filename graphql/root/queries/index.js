const {
    graphql,
    GraphQLObjectType,
} = require('graphql');
const  { room, allRooms, rooms, filterRoomsByLatLong } = require('./../room').queries;
const { client, allClients } = require('./../client').queries;

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      room,
      rooms,
      allRooms,
      client,
      allClients,
      filterRoomsByLatLong
    }
});

module.exports = query;