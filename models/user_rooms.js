'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_rooms.init({
    id: {
      type:  DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_rooms',
  });
  return user_rooms;
};