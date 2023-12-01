const errorHandlers = async (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "InvalidEmail":
      res.status(400).json({ message: "Email is required" });
      break;
    case "InvalidPassword":
      res.status(400).json({ message: "Password is required" });
      break;
    case "Unauthorized":
      res.status(400).json({ message: "Invalid email/password" });
      break;
    case "invalidMsg":
      res.status(400).json({ message: "Message is required" });
      break;

    case "JsonWebTokenError":
    case "invalidToken":
      res.status(400).json({ message: "Invalid token" });
      break;

    case "forbidden":
      res.status(404).json({ message: "You're not authorized" });
      break;

    case "NotFounds":
      res.status(404).json({ message: "Data not found" });
      break;

    default:
      res.status(500).json({ message: "internal server error" });
      break;
  }
};

module.exports = errorHandlers;
