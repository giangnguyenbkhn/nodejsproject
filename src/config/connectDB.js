const { Sequelize } = require("sequelize");

//Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("testdatabase", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;
//file này dùng để test kết nối đến database thôi vì đường dẫn
//đã được file config.js mang rồi
