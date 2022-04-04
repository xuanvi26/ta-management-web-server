const express = require("express");
const router = express.Router();
const { registerUser } = require.main.require("./src/services/account");
const schema = require.main.require("./src/models/account/schema");
const { response_type } = require.main.require("./src/response");

router.get("/register", (req, res) => {
  res.render("pages/landing/register", {errors: []});
});

router.post("/register", async (req, res) => {
  req.body.registeredCourses = req.body.registeredCourses ? req.body.registeredCourses.split(",") : [];
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).render("pages/landing/register", {errors: error.details.map((detail) => detail.message)})
    return;
  }
  const result = await registerUser(value);

  if (result.error) {
    res.status(400).json({
      response: response_type.BAD_REQUEST,
      errors: result.error.details.map((detail) => detail.message),
    });
  } else {
    res.json({ response: response_type.OK, errors: [] });
  }
});

module.exports = router;
