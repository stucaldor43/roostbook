const { GraphQLClient } = require('graphql-request');

const protocol = 'http';
const domain = 'localhost'
const port = 8080;
const serverAddress = `${protocol}://${domain}:${port}`;
const graphqlServerAddress = `http://localhost:4000/graphql`;

const client = new GraphQLClient(graphqlServerAddress, {
  credentials: 'include'
});

const request = client.request.bind(client);

const debounce = (func, delay) => { 
  let debounceTimer 
  return function() { 
      const context = this
      const args = arguments 
          clearTimeout(debounceTimer) 
              debounceTimer 
          = setTimeout(() => func.apply(context, args), delay) 
  } 
};

module.exports = {
  request,
  serverAddress,
  debounce
};