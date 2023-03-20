const { createConversation, findConversation } = require("../services/Conversation.service");
const { createMesage, getMesageUser } = require("../services/Message.service");

module.exports = (socket) => {
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
      const get = await getMesageUser(conversationId);
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
      if (get.length === 0) {
      
        return socket.emit("getmessage", "Not Found");
      }
      return socket.emit("getmessage", get);
    } catch (error) {
      return socket.emit("getmessage", error);
    }
  });
};
