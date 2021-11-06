'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.messages, {
        foreignKey: 'user_id',
        as: 'user'
      });
      users.belongsToMany(models.rooms, {
        through: 'user_rooms',
        as: 'rooms',
        foreignKey: 'user_id'
      });
      users.hasOne(models.google_users, {
        foreignKey: 'user_id',
        as: 'gu'
      });
      users.hasOne(models.rooms, {
        foreignKey: 'room_admin',
        as: 'r_a'
      })
    }
  };
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    local_account: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};