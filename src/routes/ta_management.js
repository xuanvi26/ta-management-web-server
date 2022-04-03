const express = require("express");
const router = express.Router();
const { checkAuthentication } = require.main.require(
  "./src/utils/authentication"
);
const { response_type } = require.main.require("./src/response");

// EXAMPLE OF A GET
router.get("/", (req, res) => {
  res.status(404).json("Not implemented ta_management");
});

// EXAMPLE OF A POST
router.post("/test", async (req, res) => {
  console.log(req.body);
  res.status(404).json("Not implemented");
});

module.exports = router;
