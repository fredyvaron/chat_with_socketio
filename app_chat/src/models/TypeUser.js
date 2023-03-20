const { DataTypes } = require("sequelize");

module.exports = (sequalize) => {
  sequalize.define(
    "TypeUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      paranoid: true,
    }
  );
};
