const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("UserLogin", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    oauth_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });
};
