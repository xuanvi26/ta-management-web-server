const express = require("express");
const router = express.Router();
const { checkAuthentication, checkAuthenticationWithUserType } = require.main.require(
  "./src/utils/authentication"
);
const { response_type } = require.main.require("./src/response");

router.get(
  "/",
  checkAuthenticationWithUserType(["sysop"], (req, res) => {
    res.render("pages/sysop_tasks/sysop_landing.ejs", {
      userTypes: req.session.user.userTypes,
      username: req.session.user.username
    });
  })
);

router.get(
  "/add-user",
  checkAuthenticationWithUserType(["sysop"], (req, res) => {
    res.render("pages/sysop_tasks/sysop_add_user.ejs", {
      userTypes: req.session.user.userTypes,
      username: req.session.user.username
    });
  })
);

// EXAMPLE OF A POST
router.post("/test", async (req, res) => {
  console.log(req.body);
  res.status(404).json("Not implemented");
});

module.exports = router;
