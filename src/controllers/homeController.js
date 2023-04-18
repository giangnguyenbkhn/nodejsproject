//controller gui cac yeu cau len services
import db from "../models/index";
import CRUDServices from "../services/CRUDServices";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getAbout = (req, res) => {
  return res.render("./test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
//create
let postCRUD = async (req, res) => {
  let message = await CRUDServices.createNewUser(req, res);
  console.log(message);
  return res.send("crud page");
};
//read
let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  return res.render("displayCRUD.ejs", { data: data });
};
//edit
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  // kiem tra ton tai id tren query
  if (userId) {
    let userData = await CRUDServices.getUserInfoById(userId);
    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.send("User not found");
  }
};
//update
let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDServices.updateUserData(data);
  return res.redirect("/get-crud");
};
//delete
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDServices.deleteUserById(id);
    return res.redirect("/get-crud");
  } else {
    return res.send("User not found");
  }
};
module.exports = {
  getHomePage,
  getAbout,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
// 2
