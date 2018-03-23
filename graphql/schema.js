const {
    graphql,
    GraphQLSchema,
} = require('graphql');
const query = require('./root/queries');
const mutation = require('./root/mutations');

module.exports = new GraphQLSchema({
    query,
    mutation
});