"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Allcode.init(
    {
      // key bao gom type(role,status,time), key(r1,r2,r3,s1,s2,s3,t1,t2,t3) ,value(admin,....)(cac thuoc tinh cua cac thanh phan)
      //   https://docs.google.com/spreadsheets/d/175ts9y-bJGAwEUtVEFojJQ4nFCH_lIU0poA0wVjM_lk/edit#gid=0
      key: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
