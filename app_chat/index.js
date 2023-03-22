const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const events = require("./src/sockets/event");
const http = require("http").createServer(server);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const seed = require('./src/seed/seed');
const { User, Notification} = require('./src/db')
const { findConversation, createConversation } = require("./src/services/Conversation.service.js");
const { createMesage, getMesageUser } = require("./src/services/Message.service.js");
const { createNotificacion, findnameByNotification } = require("./src/services/Notification.service.js");

io.on('connection', (socket) => {
  console.log('Un nuevo usuario se ha conectado');

/*   socket.on('sendNotification', ( message ) => {
    console.log(message.recipientId, 'recipiente id', message.text, 'message');
    socket.to(message.recipientId).emit('newNotification', message); // Enviar la notificación solo al usuario destinatario
  }); */
  socket.on("sendNotification", async (notification) => {
    console.log("New notification received", notification);
    const data = await createNotificacion(notification);
    console.log(data, "data de notification sent")
    const search = await findnameByNotification(notification.user_sender)
    console.log(search, "resiltado de la busqueda por nombre")
    const joinnee = {...notification, search}
    console.log(joinnee, "resultado unido con el nombre de usario ")
    io.to(notification.user_receiver).emit("newNotification", joinnee);
    
  });
  socket.on("join", (conversationId) => {
    socket.join(conversationId);
  });
  socket.on("message", async (body) => {
    try {
      let conversation = await findConversation(body);
      if (!conversation) {
        conversation = await createConversation(body);
      }
      if (body.message) {
        const newMessage = await createMesage(body, conversation.id);
      }
      const conversationId = conversation.id;
      const recipientId = conversation.receiver_id;
      const get = await getMesageUser(conversationId);
      socket.to(conversationId).emit("message", get);
      socket.to(recipientId).emit("new_message", "You have a new message!");
      /* eturn Ok(res, conversation); */
    } catch (error) {
      console.log(error);
      socket.broadcast.emit("message", {
        error,
      });
    }
  });
  socket.on("getmessage", async (data) => {
    try {
      const get = await getMesageUser(data.id);
      if (get.length === 0) {
        return socket.emit("getmessage", "Not Found");
      }
      socket.to(data.id).emit("getmessage", get);
      return socket.emit("getmessage", get);
    } catch (error) {
      return socket.emit("getmessage", error);
    }
  });
  socket.on('disconnect', () => {
    console.log('El usuario se ha desconectado');
  });
});
conn.sync({ force: false }).then(async () => {
  await seed();
  http.listen(process.env.PORT || 3003, () => {
    console.log(
      `server running`
    );
  });
});
