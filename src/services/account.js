const model = require.main.require("./src/models/account");

async function registerUser(user) {
  const userExists = !!(await model.getUserWithAnyKeys({
    username: user.username,
    email: user.email,
    studentId: user.studentId
  }));

  if (userExists) {
    return { error: { details: [{ message: "Registration failed" }] } };
  }

  return await model.writeUser(user);
}

module.exports = {
  registerUser,
};
