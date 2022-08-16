const { Client } = require("pg");

const client = new Client({
  connectionString: `postgresql://postgres:yourpassword@localhost/grads_offers_node`,
});
client.connect();

module.exports = client;
