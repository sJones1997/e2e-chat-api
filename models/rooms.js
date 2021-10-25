'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rooms.belongsToMany(models.users, {
        through: 'user_rooms',
        as: 'user',
        foreignKey: 'room_id'
      });
      rooms.hasMany(models.messages, {
        foreignKey: 'room_id',
        as: 'room'
      });
      rooms.belongsTo(models.users, {
        foreignKey: 'room_admin',
        as: 'r_a'
      });
    }
  };
  rooms.init({
    name: DataTypes.STRING,
    limit: DataTypes.INTEGER,
    room_admin: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE    
  }, {
    sequelize,
    modelName: 'rooms',
  });
  return rooms;
};