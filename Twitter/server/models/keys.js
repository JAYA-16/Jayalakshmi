'use strict';
module.exports = (sequelize, DataTypes) => {
  const keys = sequelize.define('keys', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  keys.associate = function(models) {
    // associations can be defined here
  };
  return keys;
};