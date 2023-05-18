import db from "../models";
import doctorService from "../services/doctorService";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;

  if (!limit) {
    limit = 10;
  }
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
//lay tat ca bac si
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json({
      doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Err from server",
    });
  }
};
let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveInforDoctor(req.body);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Err from server",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getDetailDoctorService(req.query.id);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Err from server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctor: postInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
};
