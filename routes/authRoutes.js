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


// GOOGLE LOGIN

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


// NORMAL REGISTER

router.post(
  "/register",
  register
);


// NORMAL LOGIN

router.post(
  "/login",
  login
);


// GOOGLE CALLBACK

router.get(

  "/google/callback",

  passport.authenticate(
    "google",
    {
      failureRedirect:
        "/login",

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

            role:
              req.user.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );


      res.redirect(

        `https://task-management-app-frontend-sable.vercel.app/google-success?token=${token}`

      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }

  }
);

module.exports =
  router;