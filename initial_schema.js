const Knex = require("knex");
const knexOptions = require("./knexfile.js");
const knex = Knex(knexOptions);

const up = function() {
    return knex.schema
      .createTable("room", (table) => {
          table.increments("id").primary();
          table.integer("guest_limit").notNullable();
          table.string("style").notNullable();
          table.text("description").notNullable();
          table.integer("bath_count").notNullable();
          table.integer("bed_count").notNullable();
          table.integer("price").notNullable();
          table.float("latitude").notNullable();
          table.float("longitude").notNullable();
      })
      .createTable("client", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email_address").notNullable();
      })
      .createTable("reservations", (table) => {
          table.increments("id").primary();
          table.date("start_date").notNullable();
          table.date("end_date").notNullable();
          table.integer("fk_room_id").unsigned().references("id").inTable("room");
          table.integer("fk_client_id").unsigned().references("id").inTable("client");
      })
      .catch((reason) => console.log(reason));
  };

// up();

// knex('room').insert({guest_limit: 3, style: 'studio', description: "Nice place", bath_count: 2, bed_count: 2, price: 80, latitude: 40.7128, longitude: 74.0060})
// .then((a, b) => {
//     console.log("insert made")
// });

function check(records) {
    console.log(records.guest_limit);
};
knex.select("*").from("room").where({id: 1}).first()
.then(check);