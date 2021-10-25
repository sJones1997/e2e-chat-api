'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('google_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_name: {
        type: Sequelize.STRING
      },
      profile_id: {
        type: Sequelize.DECIMAL
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key:'id'
        }           
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('google_users');
  }
};