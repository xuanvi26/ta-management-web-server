const express = require("express");
const router = express.Router();
//var busboy = require('connect-busboy');
var formidable = require('formidable');
const { checkAuthentication, checkAuthenticationWithUserType } =
  require.main.require("./src/utils/authentication");
const { response_type } = require.main.require("./src/response");
const fs = require('fs');

// EXAMPLE OF A GET
router.get(
  "/",
  checkAuthenticationWithUserType(["admin", "sysop"], (req, res) => {
    // res.status(404).json("Not implemented ta administration");
    res.render("pages/ta_administration/orangeMenu.ejs");
  })
);

router.get(
  "/import",
  checkAuthenticationWithUserType(["admin", "sysop"], (req, res) => {
    // res.status(404).json("Not implemented ta administration");
    res.render("pages/ta_administration/import.ejs");
  })
);

router.get(
  "/taInfo",
  checkAuthenticationWithUserType(["admin", "sysop"], (req, res) => {
    // res.status(404).json("Not implemented ta administration");
    res.render("pages/ta_administration/taInfo.ejs");
  })
);

router.get(
  "/courseInfo",
  checkAuthenticationWithUserType(["admin", "sysop"], (req, res) => {
    // res.status(404).json("Not implemented ta administration");
    res.render("pages/ta_administration/courseInfo.ejs");
  })
);

router.get(
  "/edit",
  checkAuthenticationWithUserType(["admin", "sysop"], (req, res) => {
    // res.status(404).json("Not implemented ta administration");
    res.render("pages/ta_administration/edit.ejs");
  })
);

// EXAMPLE OF A POST
router.post("/hello", async (req, res) => {
  // var form = new formidable.IncomingForm();
  // form.parse(req, function(err, fields, files) {
  //   console.log("file size: "+JSON.stringify(files.fileUploaded.size));
  //   console.log("fasdfasdf")
  // }
  // )
  res.status(404).json("HELLOOOO");
  // process.stdout.write("Hello World\n"); 
});

module.exports = router;
