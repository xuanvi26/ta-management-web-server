const express = require("express");
const router = express.Router();
const { checkAuthentication, checkAuthenticationWithUserType } = require.main.require(
  "./src/utils/authentication"
);
const { response_type } = require.main.require("./src/response");


// EXAMPLE OF A GET
router.get("/", checkAuthenticationWithUserType(["ta","prof"],(req, res) => {
  //res.status(404).json("Not implemented ta_management");
  res.render("pages/ta_management/ta_management")
}));

router.get("/ta-management", (req,res) => {
  res.render("pages/ta_management/ta_management_course")
});

// EXAMPLE OF A POST
router.post("/test", async (req, res) => {
  res.status(404).json("Not implemented");
});

module.exports = router;
