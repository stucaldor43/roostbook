const client = require('./queries/client');
const allClients = require('./queries/allClients');
const createClient = require('./mutations/createClient');

module.exports = {
    queries: {
        client,
        allClients
    },
    mutations: {
        createClient
    }
};