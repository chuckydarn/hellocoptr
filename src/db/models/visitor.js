'use strict';
module.exports = (sequelize, DataTypes) => {
  var Visitor = sequelize.define('Visitor', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg: "must be a valid email"}
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Visitor.associate = function(models) {
    // associations can be defined here
    Visitor.belongsTo(models.Company, {
      foreignKey: "companyId",
      onDelete: "CASCADE"
    });

    Visitor.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      onDelete: "CASCADE"
    });
  };
  return Visitor;
};
