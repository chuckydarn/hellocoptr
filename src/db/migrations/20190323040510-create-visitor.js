'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Visitors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: {msg: "must be a valid email"}
        }
      },
      phone: {
        type: Sequelize.STRING
      },
      companyId: {
        allowNull: false,
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        reference: {
          model: "Companies",
          key: "id",
          as: "companyId"
        }
      },
      employeeId: {
        allowNull: false,
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        reference: {
          model: "Employees",
          key: "id",
          as: "employeeId"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Visitors');
  }
};
