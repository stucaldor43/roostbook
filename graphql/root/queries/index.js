const {
    graphql,
    GraphQLObjectType,
} = require('graphql');
const  { room, allRooms } = require('./../room').queries;
const { client, allClients } = require('./../client').queries;

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      room,
      allRooms,
      client,
      allClients
    }
});

module.exports = query;