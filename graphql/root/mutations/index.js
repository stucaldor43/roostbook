const {
    graphql,
    GraphQLObjectType
} = require('graphql');
const { createClient } = require('./../client').mutations;
const { createReservation } = require('./../reservation').mutations;

const mutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createClient,
        createReservation
    }
});

module.exports = mutation;