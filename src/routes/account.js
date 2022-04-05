const express = require("express");
const router = express.Router();
const { checkAuthenticationWithUserType } = require.main.require(
	"./src/utils/authentication"
);
const {
	registerUser,
	handleSysopUserRegistration,
	handleUnauthenticatedUserRegistration,
	findUsers,
	deleteUser,
} = require.main.require("./src/services/account");
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

router.get(
	"/users",
	checkAuthenticationWithUserType(["sysop"], async (req, res) => {
		console.log(req.query);
		if (!req.query.search_term) {
			res.render("pages/sysop_tasks/sysop_search_users.ejs", {
				userTypes: req.session.user.userTypes,
				username: req.session.user.username,
				error: "Please enter a search term.",
			});
		} else {
			const users = await findUsers(req.query.search_term);

			if (users.length === 0) {
				res.render("pages/sysop_tasks/sysop_search_users.ejs", {
					userTypes: req.session.user.userTypes,
					username: req.session.user.username,
					error: "No user matched search term.",
				});
			} else {
				console.log(users);
				res.render("pages/sysop_tasks/sysop_users_result.ejs", {
					userTypes: req.session.user.userTypes,
					username: req.session.user.username,
					users,
				});
			}
		}
	})
);

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

router.post(
	"/remove",
	checkAuthenticationWithUserType(["sysop"], async (req, res) => {
		if (req.body.username && (await deleteUser(req.body.username))) {
			res.render("pages/sysop_tasks/sysop_landing.ejs", {
				successMsg: `Deleted user ${req.body.username}`,
				userTypes: req.session.user.userTypes,
				username: req.session.user.username,
			});
		} else {
			res.render("pages/sysop_tasks/sysop_landing.ejs", {
				errorMsg: "Internal error: failed to delete user.",
				userTypes: req.session.user.userTypes,
				username: req.session.user.username,
			});
		}
	})
);

module.exports = router;
