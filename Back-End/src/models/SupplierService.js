const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("SupplierService", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
