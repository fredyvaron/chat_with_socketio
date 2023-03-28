const db = require("../db");
const createNotificacion = async (notification) => {
  const savedNotification = await db.Notification.create(notification);
  console.log(savedNotification, "datos de la notificacion", savedNotification.id);
  const notifications = await db.Notification.findByPk(savedNotification.id, {
    include: [
      {
        model: db.User,
        as: "ReceiverUser",
        attributes: ["nombre"],
      },
      {
        model: db.User,
        as: "SenderUser",
        attributes: ["nombre"],
      },
    ],
  })
  return notifications;
};
const findnameByNotification = async (id) => {
  const search = await db.User.findByPk(id, {
    attributes: ["nombre"],
  });
  return search.nombre;
};

const findReactNotificationsByUser = async (id) => {
  const notification = await db.Notification.findAll({
    where: {
      user_receiver: id,
      read: false,
    },
    include: [
      {
        model: db.User,
        as: "ReceiverUser",
        attributes: ["nombre"],
      },
      {
        model: db.User,
        as: "SenderUser",
        attributes: ["nombre"],
      },
    ],
  });
  return notification;
};
const findNotificationByConversation = async(id, user) => { 
  console.log(id, user)
  const notification = await db.Notification.findAll({where: { conversation_id: id, user_receiver:user}})
  console.log(notification, "service notification")
  return notification
}
const markNotificationAsReading = async(notificationId) => {
  console.log(notificationId, "Marking notification as read")
  const notification = await db.Notification.findByPk(notificationId);
  if(notification){
    notification.read= true;
    await notification.save();
    console.log(notification,"resultado de notification")
    return notification;
  }
}
module.exports = {
  createNotificacion,
  findnameByNotification,
  findReactNotificationsByUser,
  markNotificationAsReading,
  findNotificationByConversation
};
