const { Client } = require("pg");

const client = new Client({
  connectionString: `postgresql://postgres:yourpassword@locahost/grads_offers_node`,
});
client.connect();

module.exports = client;
