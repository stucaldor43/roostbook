const reservation = require('./queries/reservation');
const createReservation = require('./mutations/createReservation'); 

module.exports = {
    queries: {
        reservation
    },
    mutations: {
        createReservation
    }
  };