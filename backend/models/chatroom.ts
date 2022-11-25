const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Chatroom extends Model {}
Chatroom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    socket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "chatroom",
  }
);

Chatroom.sync();

export { Chatroom };
