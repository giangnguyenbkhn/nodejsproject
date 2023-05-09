import db from "../models/index";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

//compare password login
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          where: { email: email },
          // chi lay ra nhung truong nam trong attributes
          attributes: ["email", "roleId", "firstName", "lastName", "password"],
          raw: true,
        });
        if (user) {
          //compare password, giai ma password (passwork la chuoi ng dung nhap vao, user.password lay len tu database)
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            // khong hien thi ra password khi post api
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        // return error
        (userData.errCode = 1),
          (userData.errMessage = `Your's  email isn't exist in your system.Please try other email `);
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
//check email exist login
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
//getAllUsers
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
          // config raw:true tren config.json de thay the cac lan su dung sau
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
//get keyuser
let getKeyUser = (keySearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (keySearch.genderSearch !== "ALL") {
        let usersfindKey = await db.User.findAll({
          where: {
            lastName: {
              [Op.substring]: keySearch.nameSearch,
            },
            gender: keySearch.genderSearch,
          },
        });
        resolve({
          errCode: 0,
          errMessage: "Da tim thay nguoi dung",
          user: usersfindKey,
        });
      } else if (keySearch.genderSearch === "ALL") {
        let usersfindKey = await db.User.findAll({
          where: {
            lastName: {
              [Op.substring]: keySearch.nameSearch,
            },
          },
        });
        resolve({
          errCode: 0,
          errMessage: "Da tim thay nguoi dung",
          user: usersfindKey,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
//get gender user
// const getKeyUserGender = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (data.gender !== "ALL") {
//         let userByGender = await db.User.findAll({
//           where: {
//             gender: data.gender,
//           },
//           attributes: {
//             exclude: ["password"],
//           },
//         });
//         resolve({
//           data: userByGender,
//           errCode: 0,
//           message: "Success",
//         });
//       } else if (data.gender === "ALL") {
//         let userALL = await db.User.findAll({
//           attributes: {
//             exclude: ["password"],
//           },
//         });
//         resolve({
//           data: userALL,
//           errCode: 0,
//           message: "Success",
//         });
//       }
//     } catch (error) {
//       reject(e);
//     }
//   });
// };
const salt = bcrypt.genSaltSync(10);
//hash password use bcrypt
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
// create new user
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used,Please try another email",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//edit user
let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        await db.User.update(
          {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender,
          },
          {
            where: {
              id: data.id,
            },
          }
        );
        resolve({
          errCode: 0,
          message: "Update user success",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//delete user
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let founduser = await db.User.findOne({
        where: { id: userId },
      });
      if (!founduser) {
        resolve({
          errCode: 2,
          message: `The user isn't exist`,
        });
      }
      await db.User.destroy({ where: { id: userId } });
      resolve({
        errCode: 0,
        message: "The user is deleted",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing Required Parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: {
            type: typeInput,
          },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin,
  getAllUsers,
  getKeyUser,
  // getKeyUserGender,
  createNewUser,
  deleteUser,
  editUser,
  getAllCodeService,
};
