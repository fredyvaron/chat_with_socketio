const { DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "Notification",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_sender: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_receiver: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        }
    )
}