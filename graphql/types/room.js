const {
    graphql,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: {
      id: { type: GraphQLID},
      guest_limit: { type: GraphQLInt },
      style: { type: GraphQLString},
      description: { type: GraphQLString},
      bath_count: { type: GraphQLInt},
      bed_count: { type: GraphQLInt},
      price: { type: GraphQLInt},
      latitude: { type: GraphQLFloat},
      longitude: { type: GraphQLFloat }
    }
});

module.exports = RoomType;