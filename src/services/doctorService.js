import db from "../models";
let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        where: { roleId: "R2" },
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        attributes: {
          exclude: ["password", "image"],
        },
        where: { roleId: "R2" },
      });
      resolve({ errCode: 0, data: doctors });
    } catch (error) {
      reject(error);
    }
  });
};
//luu thong tin bac si tu file markdown
let saveInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.doctorId ||
        !inputData.contentHTML ||
        !inputData.contentMarkdown
      ) {
        resolve({ errCode: 1, errMessage: "Missing parameter" });
      } else {
        await db.Markdown.create({
          contentMarkdown: inputData.contentMarkdown,
          contentHTML: inputData.contentHTML,
          description: inputData.description,
          doctorId: inputData.doctorId,
        });
        resolve({
          errCode: 0,
          errMessage: "Save infor doctor success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailDoctorService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: doctorId },
          attributes: {
            exclude: ["password", "image"],
          },
          //doan include nay la doan join 2 table
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({ errCode: 0, data: data });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveInforDoctor: saveInforDoctor,
  getDetailDoctorService: getDetailDoctorService,
};
