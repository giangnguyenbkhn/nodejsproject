// noi co the choc den database
//ma hoa password
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { where } from "sequelize";
//database
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);
// hash password use bcryptjs
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
      let hashPasswordFromBcrypt = await hashUserPassword(data.body.password);
      await db.User.create({
        email: data.body.email,
        password: hashPasswordFromBcrypt,
        firstName: data.body.firstname,
        lastName: data.body.lastname,
        address: data.body.address,
        phonenumber: data.body.phonenumber,
        gender: data.body.gender === "1" ? true : false,
        roleId: data.body.roleId,
      });
      resolve("ok create a new user success");
    } catch (e) {
      reject(e);
    }
  });
};
//read/display new user
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
//get info edit user
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId }, raw: true });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
//update user
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let user = await db.User.findOne({
      //     where: { id: data.id },
      // });
      // if (user) {
      //     user.firstName = data.firstname;
      //     user.lastName = data.lastname;
      //     user.address = data.address;
      //     await user.save();
      //     let allUsers = await db.User.findAll();
      //     resolve(allUsers);
      // } else {
      //     resolve();
      // }
      await db.User.update(
        {
          firstName: data.firstname,
          lastName: data.lastname,
          address: data.address,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      resolve("update user success");
    } catch (e) {
      console.log(e);
    }
  });
};
//delete user
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: {
          id: userId,
        },
      });
      resolve();
    } catch (error) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
// 3
