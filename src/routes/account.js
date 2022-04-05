const express = require("express");
const router = express.Router();
const { registerUser, handleSysopUserRegistration, handleUnauthenticatedUserRegistration } = require.main.require("./src/services/account");
const { response_type } = require.main.require("./src/response");

router.get("/register", (req, res) => {
	if (req.session.authenticated) {
		res.render("pages/landing/home", {
			userTypes: req.session.user.userTypes,
			username: req.session.user.username,
		});
	} else {
		res.render("pages/landing/register", { errors: [] });
	}
});

router.post("/register", async (req, res) => {
  // register normally
	if (!req.session.authenticated) {
	  await handleUnauthenticatedUserRegistration(req, res);
	}
	// register from sysop functions
	else if (req.session.user.userTypes.includes("sysop")) {
    await handleSysopUserRegistration(req, res);
	}
});

module.exports = router;
