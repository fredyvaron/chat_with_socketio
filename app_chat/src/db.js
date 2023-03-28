require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, TypeUser, Message, Conversations, Notification } = sequelize.models;

TypeUser.hasMany(User);
User.belongsTo(TypeUser);

User.hasMany(Message, { foreignKey: "sender_id", as: 'OutgoingMessages' ,onDelete: "CASCADE",});
User.hasMany(Message, { foreignKey: "receiver_id", as: 'IncomingMessages', onDelete: "CASCADE", });
User.hasMany(Conversations, { foreignKey: 'user1', onDelete: "CASCADE",})
User.hasMany(Conversations, { foreignKey: 'user2', onDelete: "CASCADE",})
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'Sender'  });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver'  });

Message.belongsTo(Conversations, { foreignKey: 'conversation_id'});
Conversations.hasMany(Message, { foreignKey: "conversation_id" ,onDelete: "CASCADE"});

Notification.belongsTo(User, { foreignKey: 'user_sender', as: 'SenderUser' });
Notification.belongsTo(User, { foreignKey: 'user_receiver', as: 'ReceiverUser' });
User.hasMany(Notification, { foreignKey: 'user_sender', as: 'SentNotifications' });
User.hasMany(Notification, { foreignKey: 'user_receiver', as: 'ReceivedNotifications' });

Notification.belongsTo(Conversations, { foreignKey: "conversation_id" });
Conversations.hasMany(Notification, { foreignKey: "conversation_id" });
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
