const express = require("express");
const router = express.Router();
const { checkAuthentication, checkAuthenticationWithUserType } = require.main.require(
  "./src/utils/authentication"
);
const {
  findCourse
} = require.main.require("./src/services/course");
const { response_type } = require.main.require("./src/response");


// LANDING PAGE OF TA_MANAGEMENT (asks to input a course)
router.get("/", checkAuthenticationWithUserType(["ta","prof"],(req, res) => {
  //res.status(404).json("Not implemented ta_management");
  res.render("pages/ta_management/ta_management_landing.ejs", {
    userTypes: req.session.user.userTypes,
    username: req.session.user.username,
    });
  })
);

// AFTER THE COURSE HAS BEEN CHOSEN
router.get(
  "/courses",
  checkAuthenticationWithUserType(["ta","prof"], async (req, res) => {
    if(!req.query.course_name_search){
      res.render("pages/ta_management/ta_management_landing.ejs", {
        userTypes: req.session.user.userTypes,
        username: req.session.user.username,
        error: "Please enter a search term.",
      });
    } else{
      const courses = await findCourse(req.query.course_name_search);

      if (courses.length === 0){
        res.render("pages/ta_management/ta_management_landing.ejs", {
          userTypes: req.session.user.userTypes,
          username: req.session.user.username,
          error: "No course matched the search term."
        });
      } else{
        res.render("pages/ta_management/ta_management_course_result.ejs", {
          userTypes: req.session.user.userTypes,
          username: req.session.user.username,
          course: courses[0].course_name,
        });
      }
    } 
  })
);

//OFFICE HOURS AND RESPONSIBILITIES
router.get(
  "/office-hours-and-responsibilities",
  checkAuthenticationWithUserType(["ta","prof"], async (req, res) => {
    res.render("pages/ta_management/ta_management_office_hours.ejs", {
      userTypes: req.session.user.userTypes,
      username: req.session.user.username,
    });
  })
);

//PERFORMANCE LOG
router.get(
  "/performance-log",
  checkAuthenticationWithUserType(["ta","prof"], async (req, res) => {
    res.render("pages/ta_management/ta_management_performance_log.ejs", {
      userTypes: req.session.user.userTypes,
      username: req.session.user.username,
    });
  })
);

//WISH LIST
router.get(
  "/wish-list",
  checkAuthenticationWithUserType(["ta","prof"], async (req, res) => {
    res.render("pages/ta_management/ta_management_wish_list.ejs", {
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
