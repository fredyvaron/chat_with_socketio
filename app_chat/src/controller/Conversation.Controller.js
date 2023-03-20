const {
  findConversation,
  createConversation,
  getConversationUser,
  deleteConversation,
} = require("../services/Conversation.service");
const { createMesage, deleteMesssageByConversation } = require("../services/Message.service");
const { Error, Ok, NotFound } = require("../utils/HttpResponse");

const findOrCreateConversation = async (req, res) => {
  const body = req.body;
  try {
    let conversation = await findConversation(body);
    if (!conversation) {
      conversation = await createConversation(body);
    }
    const newMessage = await createMesage(body, conversation.id);
    return Ok(res, conversation);
  } catch (error) {
    console.log(error);
    Error(res, error);
  }
};
const findConversations = async (req, res) => {
  let body = req.body;
  try {
    let conversations = await findConversation(body);
    if (!conversations) {
      conversations = await createConversation(body);
    }
    return Ok(res, conversations);
  } catch (error) {
    Error(res, error);
  }
}

const findConversationUser = async (req, res) => {
  const { user } = req.body;
  try {
    const search = await getConversationUser(user);
    if (search.length === 0) {
      return NotFound(res, "Not Found Convrsation");
    }
    return Ok(res, search);
  } catch (error) {
    return Error(res, error);
  }
};
const deleteConversationUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletes = await deleteConversation(id);
    if (!deletes) {
      return NotFound(res, "Not Found Conversation");
    }
    await deleteMesssageByConversation(id)
    return Ok(res, "Successfully deleted");
  } catch (error) {
    return Error(res, error);
  }
};
module.exports = {
  findOrCreateConversation,
  findConversationUser,
  deleteConversationUser,
  findConversations
};
