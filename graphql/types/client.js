const {
    graphql,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql');

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email_address: { type: GraphQLString }
    }
});

module.exports = ClientType;