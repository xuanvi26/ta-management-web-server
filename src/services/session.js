const model = require.main.require("./src/models/account");
const { comparePasswords } = require.main.require("./src/utils/password");

async function checkLoginCredentials(username, password) {
  const user = await model.getUserWithKeys({ username });
  return user && (await comparePasswords(password, user.password));
}

module.exports = {
  checkLoginCredentials,
};
