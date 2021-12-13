const express = require("express");
import { createClient } from "redis";

const app = express();

(async () => {
  const client = createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.set("key", "value");
  const value = await client.get("key");
})();

app.listen(80, () => {
  console.log("Started");
});
