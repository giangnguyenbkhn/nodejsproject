import db from "../models/index";
import userService from "../services/userService";
let handleLogin = async (req, res) => {
  // nhan email va password tu client, cu the la tu file userService ben fe
  let email = req.body.email;
  let password = req.body.password;
  //check email exist
  //compare password
  //return userInfor
  //access_token:JWT(json web token)
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  //tra data ve cho client
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
//get all user
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL,id
  //khong truyen id tra ve loi
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  // console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users: users,
  });
};

//get user by key
let handleGetUserByKey = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let data = await userService.getKeyUser(req.body);
  return res.status(200).json({
    errCode: data.errCode,
    errMessage: data.errMessage,
    users: data.user ? data.user : {},
  });
};
//get user by gender
// let handleGetUserByGender = async (req, res) => {
//   console.log(req.body);
//   let data = await userService.getKeyUserGender(req.body);
//   return res.status(200).json({
//     users: data.data,
//     errCode: data.errCode,
//     message: data.message,
//   });
// };
//create new user
let handleCreateNewUser = async (req, res) => {
  let data = await userService.createNewUser(req.body);
  // console.log(message);
  return res.status(200).json({
    errCode: data.errCode,
    errMessage: data.errMessage,
  });
};
//edit user
let handleEditUser = async (req, res) => {
  let data = req.body;
  if (!data.id || !data.roleId || !data.positionId || !data.gender) {
    return res.status(200).json({
      errCode: 2,
      message: "Missing required parameter",
    });
  }
  let message = await userService.editUser(data);
  return res.status(200).json(message);
};
//delete user
let handleDeleteUser = async (req, res) => {
  // console.log(req.body);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameter",
    });
  }

  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
//get allcode
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("Get all code server", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleLogin,
  handleGetAllUsers,
  // handleGetUserByGender,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  handleGetUserByKey,
  getAllCode,
};
