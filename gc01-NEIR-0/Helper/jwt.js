const jwt = require("jsonwebtoken")
// const secret = "rahasia" // ini taro di ".inv"

function createToken (playLoad){ // playLoad bisa id, name, email dst (gak harus satu)
    return jwt.sign(playLoad, process.env.JWT_SECRET); // jwt.sign(values, secret), (sudah taro di ".inv")
}

function compareToken (token){
    return jwt.verify(token, process.env.JWT_SECRET) // jwt.verify(token, secret), (sudah taro di ".inv")
}

module.exports = {
    createToken,
    compareToken
}