'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      messages.belongsTo(models.users, {
        as: 'user',
        foreignKey: 'user_id'
      });
      messages.belongsTo(models.rooms, {
        as: 'room',
        foreignKey: 'room_id'
      });
    }
  };
  messages.init({
    message: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'messages',
  });
  return messages;
};