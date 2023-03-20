const {
  getMesageUser,
  deleteMessageById,
  readMessages,
} = require("../services/Message.service");
const { Error, NotFound, Ok } = require("../utils/HttpResponse");

const getMessagesByUsaer = async (req, res) => {
  const id = req.params.id;
  try {
    const get = await getMesageUser(id);
    if (get.length === 0) {
      return NotFound(res, "Not Found Messages");
    }
    return Ok(res, get);
  } catch (error) {
    return Error(res, error);
  }
};
const deleteMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const deletes = deleteMessageById(id);
    if (!deletes) {
      return NotFound(res, "Not Found Messages");
    }
    return Ok(res, deletes);
  } catch (error) {
    return Error(res, error);
  }
};
const readMessage = async (req, res) => {
  const { id } = req.params
  try {
    const read = await readMessages(id)
    console.log(read, 'read')
    if(!read){
      return NotFound(res, "Not found message")
    }
    return Ok(res, "Successfully updated read") 
  } catch (error) {
    return Error(res, error);
  }
}

module.exports = {
  getMessagesByUsaer,
  deleteMessage,
  readMessage
};
