const { DataTypes } = require("sequelize");

module.exports = (sequalize) => {
  sequalize.define(
    "Conversations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      paranoid: true,
    }
  );
};
