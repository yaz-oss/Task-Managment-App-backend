const express =
  require("express");

const passport =
  require("passport");

const jwt =
  require("jsonwebtoken");

const router =
  express.Router();

const {
  register,
  login,
} = require(
  "../controllers/authController"
);

router.get(

  "/google",

  passport.authenticate(
    "google",
    {

      scope: [
        "profile",
        "email",
      ],

      prompt:
        "select_account",

    }
  )
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(

  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false,
    }
  ),

  async (req, res) => {

    try {

      const token =
        jwt.sign(

          {

            id:
              req.user.id,

            email:
              req.user.email,

            role:
              req.user.role,

          },

          process.env
            .JWT_SECRET,

          {

            expiresIn:
              "7d",

          }
        );
        console.log(req.user.role);
      if (
        req.user.role ===
        "admin"
      ) {

        return res.redirect(

          `${process.env.CLIENT_URL}/google-success?token=${encodeURIComponent(token)}&role=admin&username=${encodeURIComponent(req.user.username)}`
        );
      }

      return res.redirect(

        `${process.env.CLIENT_URL}/google-success?token=${encodeURIComponent(token)}&role=user&username=${encodeURIComponent(req.user.username)}`
      );

    } catch (error) {

      res.status(500).json({

        message:
          "Google login failed",

      });
    }
  }
);

module.exports =
  router;
