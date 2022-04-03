const express = require("express");
const router = express.Router();
const { checkAuthentication, checkAuthenticationWithUserType } =
  require.main.require("./src/utils/authentication");
const { response_type } = require.main.require("./src/response");

// EXAMPLE OF A GET
router.get(
  "/",
  checkAuthenticationWithUserType(["admin", "sysop"], (req, res) => {
    res.status(404).json("Not implemented ta administration");
  })
);

// EXAMPLE OF A POST
router.post("/test", async (req, res) => {
  console.log(req.body);
  res.status(404).json("Not implemented");
});

module.exports = router;
