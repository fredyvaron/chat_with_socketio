const { DataTypes } = require("sequelize");

module.exports = (sequalize) => {
  sequalize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Ingrese un email valido",
          },
        },
      },
      clave: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      }
    },
    {
      paranoid: true,
    }
  );
};
