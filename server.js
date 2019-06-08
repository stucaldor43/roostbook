const expressGraphQL = require('express-graphql');
const express = require('express');
const app = express();
const schema = require('./graphql/schema');
const { up } = require('./initial_schema');
const knex = require('./knexInstance');
const cors = require('cors');
const { serverAddress } = require('./src/helpers/helper');

up(knex);
app.use(cors({
    origin: serverAddress,
    credentials: true
}));
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));
app.listen(4000, () => console.log('server started'));