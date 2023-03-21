const { createConversation, findConversation } = require("../services/Conversation.service");
const { createMesage, getMesageUser } = require("../services/Message.service");

module.exports = (socket) => {
  socket.on("join", (conversationId) => {
    socket.join(conversationId);
  });
  socket.on("message", async (body) => {
    console.log(body, "bode de message");
    try {
      let conversation = await findConversation(body);
      console.log("se creo la conversation", conversation)
      if (!conversation) {
        conversation = await createConversation(body);
        console.log(conversation, "se creo la conversacion")
      }
      if (body.message) {
        const newMessage = await createMesage(body, conversation.id);
        console.log(newMessage, "se creo el mensaje");
      }
      const conversationId = conversation.id;
      const get = await getMesageUser(conversationId);
      console.log(get, "get message")
      socket.to(conversationId).emit("message", get);
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
      console.log(get, "get message");
      if (get.length === 0) {
      
        return socket.emit("getmessage", "Not Found");
      }
      return socket.emit("getmessage", get);
    } catch (error) {
      return socket.emit("getmessage", error);
    }
  });
};
