const model = require.main.require("./src/models/ta");

async function addTa(ta) {
    return await model.addTa(ta);
}

async function deleteTa(username) {
    return await model.deleteTa(username);
  }

module.exports = {
    addTa,
    deleteTa
};