const bcrypt = require('bcryptjs');

function hashing (planText){
    return bcrypt.hashSync(planText, bcrypt.genSaltSync(10));
}

function compare (planText, hash){
    return bcrypt.compareSync(planText, hash); // false
}

module.exports = {
    hashing,
    compare
}