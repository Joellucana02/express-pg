const { Client } = require("pg");

const client = new Client({
  connectionString: `postgresql://postgres:yourpassword@localhost/fishes_app`,
});

client.connect();

module.exports = client;
