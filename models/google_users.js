'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class google_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      google_users.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'google'       
      })
    }
  };
  google_users.init({
    profile_name: DataTypes.STRING,
    profile_id: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'google_users',
  });
  return google_users;
};