'use strict';
module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.User, {
      foreignKey: "companyId",
      as: "users"
    });

    Company.hasMany(models.Employee, {
      foreignKey: "companyId",
      as: "employees"
    });

    Company.hasMany(models.Visitor, {
      foreignKey: "companyId",
      as: "visitors"
    });

    Company.afterCreate((company, callback) => {
      return models.User.update({
        companyId: company.id
      }, {
        where: {
          id: company.createdBy
        }
      })
    })
  };
  return Company;
};
