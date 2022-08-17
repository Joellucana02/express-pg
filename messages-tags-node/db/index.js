const express = require("express");
const { Client } = require("pg");

const client = new Client({
  connectionString: `postgresql://postgres:yourpassword@localhost/messages_tags_node`,
});
client.connect();
module.exports = client;
