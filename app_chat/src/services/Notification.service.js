const db = require("../db");
const createNotificacion = async (notification) => {
  const savedNotification = await db.Notification.create(notification);
  console.log(savedNotification);
  return savedNotification;
};
const findnameByNotification = async (id) => {
  const search = await db.User.findByPk(id, {
    attributes: ["nombre"],
  });
  return search.nombre;
};
module.exports = {
  createNotificacion,
  findnameByNotification,
};
