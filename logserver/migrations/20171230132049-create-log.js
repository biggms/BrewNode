'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.ENUM,
        values: ['INFO', 'DEBUG', 'WARN', 'ERROR', 'TRACE']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logs');
  }
};