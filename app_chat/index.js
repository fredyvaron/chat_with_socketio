const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const events = require("./src/sockets/event");
const http = require("http").createServer(server);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const seed = require('./src/seed/seed')

io.on("connection", (socket) => {
  events(socket);
});
conn.sync({ force: false }).then(async () => {
  await seed();
  http.listen(process.env.PORT || 3003, () => {
    console.log(
      `server running`
    );
  });
});
