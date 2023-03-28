const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const events = require("./src/sockets/event");
const http = require("http").createServer(server);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const seed = require("./src/seed/seed");
const { User, Notification } = require("./src/db");
const {
  findConversation,
  createConversation,
} = require("./src/services/Conversation.service.js");
const {
  createMesage,
  getMesageUser,
} = require("./src/services/Message.service.js");
const {
  createNotificacion,
  findnameByNotification,
  findReactNotificationsByUser,
  markNotificationAsReading,
  findNotificationByConversation,
} = require("./src/services/Notification.service.js");

io.on("connection", (socket) => {
  console.log("Un nuevo usuario se ha conectado");

  /*   socket.on('sendNotification', ( message ) => {
    console.log(message.recipientId, 'recipiente id', message.text, 'message');
    socket.to(message.recipientId).emit('newNotification', message); // Enviar la notificación solo al usuario destinatario
  }); */
  socket.on("sendNotification", async (notification) => {
    console.log("New notification received", notification);
    const data = await createNotificacion(notification);
    console.log(data, "data de notification sent");
    /* const notifications = await findReactNotificationsByUser(notification.user_receiver); */
    io.to(notification.user_receiver).emit("newNotification", data);
  });
  socket.on("getNotification", async (userId) => {
    console.log(`User ${userId} logged in`);
    // buscar notificaciones pendientes y enviarlas al usuario
    const notifications = await findReactNotificationsByUser(userId);
    notifications.forEach((notification) => {
      io.to(userId).emit("newNotification", notification);
    });
  });
  socket.on("markNotificationAsRead", async (userID, notificationId) => {
    try {
      console.log(userID, "userId", notificationId, "NotificationId");
      const result = await markNotificationAsReading(notificationId);
      console.log(`Notification ${notificationId} marked as read`);
      io.to(userID).emit("notificationMarkedAsRead", notificationId);
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("conversationRead", async (userId, conversationId) => {
    console.log(userId, conversationId, "datos para ller la notificacion");
    try {
      const notifications = await findNotificationByConversation(conversationId, userId);
      console.log(notifications, "ingreso a conversation read");
      if (notifications) {
        for (let i = 0; i < notifications.length; i++) {
          const notification = notifications[i];
          await markNotificationAsReading(notification.id);
          console.log(`Notification ${notification.id} marked as read and deleted`);
          io.to(userId).emit("notificationDeleted", notification.id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("join", (conversationId) => {
    socket.join(conversationId);
  });
/*   socket.on("message", async (body, callback) => {
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
      callback(null, get); // call the callback function with the response
    } catch (error) {
      console.log(error);
      callback(error); // call the callback function with the error
    }
  }); */
  socket.on("message", async (body) => {
    try {
      // Validar la entrada
      if (!body || !body.message) {
        throw new Error("Invalid input");
      }
  
      // Buscar o crear la conversación
      let conversation = await findConversation(body) || await createConversation(body);
  
      // Crear el nuevo mensaje
      const newMessage = await createMesage(body, conversation.id);
  
      // Emitir eventos a los clientes
      const conversationId = conversation.id;
      const recipientId = conversation.receiver_id;
      const messages = await getMesageUser(conversationId);
      console.log(messages, "resultado de enviar el message esto es lo que va a emitir");
      socket.to(conversationId).emit("message", messages);
      socket.to(recipientId).emit("new_message", "You have a new message!");
  
      // Devolver la respuesta como una promesa resuelta
      return messages;
    } catch (error) {
      console.error(error);
  
      // Devolver la respuesta de error como una promesa rechazada
      throw new Error("Something went wrong");
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
  socket.on("disconnect", () => {
    console.log("El usuario se ha desconectado");
  });
});
conn.sync({ force: false }).then(async () => {
  await seed();
  http.listen(process.env.PORT || 3003, () => {
    console.log(`server running`);
  });
});
