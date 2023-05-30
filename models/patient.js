"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      name: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      dateOfAdmission: DataTypes.DATE,
      location: DataTypes.STRING,
      diagnosis: DataTypes.STRING,
      seen: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
