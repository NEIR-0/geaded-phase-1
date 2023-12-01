const errorHandler = async (err, req, res, next) => { // ada 4 params "err, req, res, next"
    console.log(err); // JsonWebTokenError: invalid token   ====> ("JsonWebTokenError" itu adalah name)
    switch (err.name) {
        case "InvaliInput":
            res.status(400).json({message: `${err.field} invalid`})
            break;
        case "InvalidImg": 
            res.status(400).json({message: "img undifined"})
            break;
        case "invalidPageSize": 
            res.status(400).json({message: "page or size not a number"})
            break;
        case "directionsInvalid":
            res.status(400).json({message: "directions must asc/desc"})
            break;
        
        case "SequelizeValidationError":  // "SequelizeValidationError", dari "Controllers"
        case "SequelizeUniqueConstraintError": // "SequelizeUniqueConstraintError" biasanya dari model kayak unique atau allowNull
            res.status(400).json({message: err.errors[0].message})
            break;

        case "InvalidToken": // sama case sama "JsonWebTokenError"
        case "JsonWebTokenError": // invalid token jwt, dari authoentication
            res.status(401).json({message: "Invalid Token"})
            break;

        case "Unauthenticated": // ini untuk validasi login
            res.status(401).json({message: "username / password invalid"})
            break;

        case "forbidden": // "forbidden", dari authorize
            res.status(403).json({message: "forbidden acces !"})
            break;

        case "Not found": // "SequelizeValidationError", dari "Controllers"
            res.status(404).json({message: "data not found"})
            break;

        default: // deafultnya itu (500) ==> "Internal Error Server"
            res.status(500).json({message: "Internal Error Server"})
            break;
    }
}

module.exports = errorHandler