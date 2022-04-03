const model = require.main.require("./src/models/account");
const { comparePasswords } = require.main.require("./src/utils/password");

async function checkLoginCredentials(username, password) {
  const user = await model.getUserWithKeys({ username });
  if (user && (await comparePasswords(password, user.password))) {
    return user;
  } else {
    return false;
  }
}

module.exports = {
  checkLoginCredentials,
};
