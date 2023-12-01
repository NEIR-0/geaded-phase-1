const bcrypt = require("bcryptjs");

const hashing = (planText) => {
  return bcrypt.hashSync(planText, bcrypt.genSaltSync(10));
};

const compare = (planText, password) => {
  return bcrypt.compare(planText, password);
};

module.exports = {
  hashing,
  compare,
};
