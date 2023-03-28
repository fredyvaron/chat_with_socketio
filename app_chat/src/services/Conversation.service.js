const { Op, or } = require("sequelize");
const db = require("../db");

const findConversation = async (body) => {
  console.log(body, "body de buscar conversacion")
  return await db.Conversations.findOne({
    where: {
      user1: { [Op.or]: [body.user1, body.user2] },
      user2: { [Op.or]: [body.user1, body.user2] },
    },
  });
};

const getConversationUser = async (user) => {
  const data = await db.Conversations.findAll({
    where: { [Op.or]: [{user1: user}, {user2: user}]},
  });
  return await data;
};
const createConversation = async (body) => {
  console.log(body, "body de crear la conversacion")
  return await db.Conversations.create({
    user1: body.user1,
    user2: body.user2,
  });
};

const deleteConversation = async (id) => {
  const delet = await db.Conversations.destroy({where: {id: id} })
  return delet
}

module.exports = { findConversation, createConversation, getConversationUser, deleteConversation };
