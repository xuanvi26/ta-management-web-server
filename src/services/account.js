const model = require.main.require("./src/models/account");
const schema = require.main.require("./src/models/account/schema");

async function registerUser(user) {
	const userExists = !!(await model.getUserWithAnyKeys({
		username: user.username,
		email: user.email,
		mcGillId: user.studentId,
	}));

	if (userExists) {
		return { error: { details: [{ message: "Registration failed" }] } };
	}

	return await model.writeUser(user);
}

async function handleUnauthenticatedUserRegistration(req, res) {
	req.body.registeredCourses = req.body.registeredCourses
		? req.body.registeredCourses.split(",")
		: [];
	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).render("pages/landing/register", {
			errors: error.details.map((detail) => detail.message),
		});
		return;
	}
	const result = await registerUser(value);

	if (result.error) {
		res.status(400).render("pages/landing/register", {
			errors: result.error.details.map((detail) => detail.message),
		});
		return;
		// res.status(400).json({
		//   response: response_type.BAD_REQUEST,
		//   errors: result.error.details.map((detail) => detail.message),
		// });
	} else {
		res.render("pages/landing/login", {
			successRegisterMsg: "Registration successful. ",
			errors: [],
		});
		// res.json({ response: response_type.OK, errors: [] });
	}
}

async function handleSysopUserRegistration(req, res) {
	req.body.registeredCourses = req.body.registeredCourses
		? req.body.registeredCourses.split(",")
		: [];
	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).render("pages/sysop_tasks/sysop_add_user.ejs", {
			errors: error.details.map((detail) => detail.message),
			userTypes: req.session.user.userTypes,
			username: req.session.user.username,
		});
		return;
	}
	const result = await registerUser(value);

	if (result.error) {
		res.status(400).render("pages/sysop_tasks/sysop_add_user.ejs", {
			errors: result.error.details.map((detail) => detail.message),
			userTypes: req.session.user.userTypes,
			username: req.session.user.username,
		});
		return;
		// res.status(400).json({
		//   response: response_type.BAD_REQUEST,
		//   errors: result.error.details.map((detail) => detail.message),
		// });
	} else {
		res.render("pages/sysop_tasks/sysop_landing.ejs", {
			successMsg: "New user added successfully.",
			errors: [],
			userTypes: req.session.user.userTypes,
			username: req.session.user.username,
		});
		// res.json({ response: response_type.OK, errors: [] });
	}
}

module.exports = {
	registerUser,
	handleSysopUserRegistration,
	handleUnauthenticatedUserRegistration,
};
