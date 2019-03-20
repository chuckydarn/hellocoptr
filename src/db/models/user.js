'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Company, {
     foreignKey: "companyId",
     onDelete: "CASCADE"
   });
  };
  return User;
};
