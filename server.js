const expressGraphQL = require('express-graphql');
const express = require('express');
const app = express();
const schema = require('./graphql/schema');

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));
app.listen(8080, () => console.log('server started'));