const db = require("../db");

const createMesage = async (body, id) => {
  return await db.Message.create({
    message: body.message,
    sender_id: body.sender_id,
    receiver_id: body.receiver_id,
    conversation_id: id,
  });
};
const deleteMessageById = async (id) => {
  return await db.Message.destroy({where: {id: id}});
};
const deleteMesssageByConversation = async(id) => {
  return await db.Message.destroy({ where: { conversation_id: id }})
}
const getMesageUser = async (conversation) => {
  console.log("ingreso")
  const data = await db.Message.findAll({ attributes: { exclude: ['deletedAt'] },where: { conversation_id: conversation }, order: [['createdAt', 'ASC']]});
  return data
};
const readMessages = async (id)=> {
  return await db.Message.update({read: true},{where: { conversation_id: id}})
}
module.exports = {
  createMesage,
  deleteMessageById,
  getMesageUser,
  deleteMesssageByConversation,
  readMessages
};
