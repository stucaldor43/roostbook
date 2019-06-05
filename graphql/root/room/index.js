const room = require('./queries/room');
const rooms = require('./queries/rooms');
const allRooms = require('./queries/allRooms');
const createRoom = require('./mutations/createRoom');

module.exports = {
  queries: {
    room,
    rooms,
    allRooms
  },
  mutations: {
    createRoom
  }
};