import express from "express";
let configViewEngine = (app) => {
  // file static, vi du muon lay 1 cai anh tren server thi express chi dc lay trong thu muc public
  app.use(express.static("./src/public"));
  // set view engine
  app.set("view engine", "ejs");
  //set views
  app.set("views", "./src/views");
};
module.exports = configViewEngine;
