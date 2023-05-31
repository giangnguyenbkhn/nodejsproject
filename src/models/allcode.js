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
      //quan he voi cac model khac trong database
      //lien he voi model User 1 khoa la positionId, voi ten goi la positionData ben model nay
      Allcode.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      }),
        Allcode.hasMany(models.User, {
          foreignKey: "gender",
          as: "genderData",
        });

      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
    }
  }
  Allcode.init(
    {
      // key bao gom type(role,status,time), key(r1,r2,r3,s1,s2,s3,t1,t2,t3) ,value(admin,....)(cac thuoc tinh cua cac thanh phan)
      //   https://docs.google.com/spreadsheets/d/175ts9y-bJGAwEUtVEFojJQ4nFCH_lIU0poA0wVjM_lk/edit#gid=0
      keyMap: DataTypes.STRING,
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
