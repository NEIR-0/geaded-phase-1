const errorHandlers = async (err, req, res, next) => {
  switch (err.name) {
    // SequelizeValidationError
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: "Email must be unique" });
      break;
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    // invalidEmail
    case "invalidEmail":
      res.status(400).json({ message: "Email is required" });
      break;
    case "invalidPassword":
      res.status(400).json({ message: "Password is required" });
      break;
    // duplicate
    case "duplicate":
      res.status(400).json({ message: "you already have one" });
      break;

    case "invalidLogin":
      res.status(401).json({ message: "Invalid email/password" });
      break;

    case "NotFound":
      res.status(404).json({ message: "Hero not found" });
      break;

    case "JsonWebTokenError":
    case "Unauthorized":
      res.status(401).json({ message: "Invalid token" });
      break;

    case "Forbidden":
      res.status(403).json({ message: "You are not authorized" });
      break;

    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandlers;
