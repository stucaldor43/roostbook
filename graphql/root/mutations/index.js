const {
    graphql,
    GraphQLObjectType
} = require('graphql');
const { createClient } = require('./../client').mutations;
const { createReservation } = require('./../reservation').mutations;
const { createRoom } = require('./../room').mutations;

const mutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createClient,
        createReservation,
        createRoom
    }
});

module.exports = mutation;