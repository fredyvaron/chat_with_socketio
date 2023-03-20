const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const events = require("./src/sockets/event");
const http = require("http").createServer(server);
const io = require("socket.io")(http, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  events(socket);
});
conn.sync({ force: false }).then(() => {
  http.listen(process.env.PORT || 3003, () => {
    console.log(
      `Sserver running`
    );
  });
});
