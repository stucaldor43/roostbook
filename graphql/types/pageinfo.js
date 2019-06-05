const {
  GraphQLObjectType,
  GraphQLBoolean
} = require('graphql');

const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: { type: GraphQLBoolean }
  }
});

module.exports = PageInfoType;