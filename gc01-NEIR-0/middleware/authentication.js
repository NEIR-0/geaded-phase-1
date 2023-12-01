const {compareToken} = require("../Helper/jwt")  // ambil "compare Token"
const {User} = require("../models/index") // ambil model "User"

const authentication = async (req, res, next) => {
    try {
        // console.log(req.headers);  // dari postman (req.header)
        const {authorization} = req.headers // pake "s"
        // console.log(authorization);
        if(!authorization) throw {name: "InvalidToken"}
        
        const rawToken = authorization.split(" ")
        // console.log(rawToken);
        if(rawToken.length < 2) {
            throw {name: "InvalidToken", message: "token malformed"}
        }
        if(rawToken[0] !== "Bearer"){
            throw {name: "InvalidToken", message: "wrong auth schema"}
        }

        const token = rawToken[1]
        const playload = compareToken(token) // { id: 4, iat: 1698741949 }
        // console.log(token, playload);

        const data = await User.findByPk(playload.id)
        // console.log(data);
        if(!data){
            throw {name: "InvalidToken", message: "your user not Found"}
        }

        req.user = data // "req.nama_bebas" = "data" dari "find"
        next()
        
    } catch (error) {
        next(error)
    }
}

// {
//     "email": "sukimannn@gmail.co",
//     "password": "123458",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjk4NzMxNzA3fQ.cmk6Ed0qtp3Dv-BOlCmTxKi8VesKoh1EHfK1DnE8Evg"
// }
module.exports = authentication