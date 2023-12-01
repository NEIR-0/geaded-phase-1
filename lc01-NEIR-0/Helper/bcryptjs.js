const bcryptjs = require("bcryptjs");

const createPassword = (planText) => {
  return bcryptjs.hashSync(planText, bcryptjs.genSaltSync(10));
};

const comparePassword = (planText, hash) => {
  return bcryptjs.compareSync(planText, hash);
};

module.exports = { createPassword, comparePassword };
