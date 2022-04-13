const express = require("express");
const router = express.Router();
const { checkAuthentication, checkAuthenticationWithUserType } = require.main.require(
  "./src/utils/authentication"
);
const { response_type } = require.main.require("./src/response");

// LANDING PAGE OF TA RATING
router.get("/", checkAuthenticationWithUserType(["student","ta","prof","admin","sysop"],(req, res) => {
  //res.status(404).json("Not implemented ta_management");
  res.render("pages/ta_rating/ta_rating_landing.ejs", {
    userTypes: req.session.user.userTypes,
    username: req.session.user.username,
    });
  })
);


//POST REQUEST for TA performance log
router.post(
  "/add-ta-rating",
  checkAuthenticationWithUserType(["student","ta","prof","admin","sysop"], async (req,res) => {
    //var courseName = sessionStorage.getItem("currentCourse");
    res.render("pages/landing/home.ejs", {
      userTypes: req.session.user.userTypes,
      username: req.session.user.username,
    });
  })
);

// EXAMPLE OF A POST
router.post("/test", async (req, res) => {
  console.log(req.body);
  res.status(404).json("Not implemented");
});

module.exports = router;
