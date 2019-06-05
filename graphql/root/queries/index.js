const {
    graphql,
    GraphQLObjectType,
} = require('graphql');
const  { room, allRooms, rooms } = require('./../room').queries;
const { client, allClients } = require('./../client').queries;

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      room,
      rooms,
      allRooms,
      client,
      allClients
    }
});

module.exports = query;