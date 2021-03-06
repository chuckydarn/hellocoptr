'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg: "must be a valid email"}
      }
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Company, {
      foreignKey: "companyId",
      onDelete: "CASCADE"
    });

    Employee.hasMany(models.Visitor, {
      foreignKey: "employeeId",
      as: "visitors"
    });
  };
  return Employee;
};
