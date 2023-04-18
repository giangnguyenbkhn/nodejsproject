import db from "../models/index";
import userService from "../services/userService";
let handleLogin = async(req, res) => {
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
let handleGetAllUsers = async(req, res) => {
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
//create new user
let handleCreateNewUser = async(req, res) => {
    let message = await userService.createNewUser(req.body);
    // console.log(message);
    return res.status(200).json({
        message,
    });
};
//edit user
let handleEditUser = async(req, res) => {
    let data = req.body;
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            message: "Missing required parameter",
        });
    }
    let message = await userService.editUser(data);
    return res.status(200).json(message);
};
//delete user
let handleDeleteUser = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameter",
        });
    }

    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
};

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
};