const _ = require("lodash");
const { hashPassword } = require.main.require("./src/utils/password");
const writer = require.main.require("./src/utils/writer");
const reader = require.main.require("./src/utils/reader");
const schema = require.main.require("./src/models/account/schema");
const logger = require.main.require("./src/utils/logger");

const ACCOUNT_TABLE = "./src/models/account/db.json";

async function writeUser(user) {
  // Validate again before writing row
  let { error, value: validatedUser } = schema.validate(user);
  if (!error) {
    validatedUser.password = await hashPassword(validatedUser.password);
    try {
      await writer.writeLineToFile(
        JSON.stringify(validatedUser),
        ACCOUNT_TABLE
      );
    } catch (error) {
      logger.error({ error, ctx: "db.core.account" });
      error = { details: [{ message: error.message }] };
    }
  }

  return { error };
}

//e.g., {firstName: "jerry", lastName: "gao"} -> find user with firsName AND lastName
// does not work for values of arrays or objects
async function getUserWithKeys(searchTerms) {
  const users = reader.fileAsyncIterator(ACCOUNT_TABLE);
  for await (const rawUser of users) {
    try {
      let user = JSON.parse(rawUser);
      if (
        Object.entries(searchTerms).every(([key, value]) => {
          return user[key] === value;
        })
      ) {
        return user;
      }
    } catch (error) {
      logger.error({ error, ctx: "db.core.account" });
    }
  }
  return false;
}

//e.g., {firstName: "jerry", lastName: "gao"} -> find users with firsName OR lastName
// does not work for values of arrays or objects
async function getUserWithAnyKeys(searchTerms) {
  const users = reader.fileAsyncIterator(ACCOUNT_TABLE);
  for await (const rawUser of users) {
    try {
      let user = JSON.parse(rawUser);
      if (
        Object.entries(searchTerms).some(([key, value]) => {
          return user[key] === value;
        })
      ) {
        return user;
      }
    } catch (error) {
      logger.error({ error, ctx: "db.core.account" });
    }
  }
  return false;
}

module.exports = {
  writeUser,
  getUserWithKeys,
  getUserWithAnyKeys,
};
