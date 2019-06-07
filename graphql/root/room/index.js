const room = require('./queries/room');
const rooms = require('./queries/rooms');
const allRooms = require('./queries/allRooms');
const filterRoomsByLatLong = require('./queries/filterRoomsByLatLong');
const createRoom = require('./mutations/createRoom');

module.exports = {
  queries: {
    room,
    rooms,
    allRooms,
    filterRoomsByLatLong
  },
  mutations: {
    createRoom
  }
};