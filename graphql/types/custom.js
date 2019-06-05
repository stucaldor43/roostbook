const {
  graphql,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = require('graphql');
const RoomType = require('./room');
const PageInfoType = require('./pageinfo');
 
const CustomType = new GraphQLObjectType({
  name: 'Custom',
  fields: {
    results: { type: GraphQLList(RoomType) },
    totalRoomHits: { type: GraphQLInt },
    info: { type: PageInfoType }
  }
});

module.exports = CustomType;