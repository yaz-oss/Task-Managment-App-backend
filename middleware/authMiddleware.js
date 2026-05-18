
const jwt =
require("jsonwebtoken");

const User =
require("../models/user");

const authMiddleware =
async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401)
      .json({

        message:
          "No token provided",

      });
    }

    const token =
      authHeader.startsWith(
        "Bearer "
      )

        ? authHeader.split(" ")[1]

        : authHeader;

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET
      );

    req.user =
      decoded;

    const user =
      await User.findByPk(
        decoded.id
      );

    if (!user) {

      return res.status(401)
      .json({

        message:
          "User not found",

      });
    }

    if (user.blocked) {

      return res.status(403)
      .json({

        message:
          "You are blocked by admin",

      });
    }

    req.user = {
      ...decoded,
      role: user.role,
    };

    next();

  } catch (error) {

    console.log(
      "AUTH ERROR:",
      error.message
    );

    return res.status(401)
    .json({

      message:
        "Invalid token",

    });
  }
};

module.exports =
authMiddleware;

