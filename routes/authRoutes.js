const express =
  require("express");

const passport =
  require("passport");

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
      failureRedirect:
        "/login",
      session: false,
    }
  ),

  (req, res) => {

    res.redirect(
      process.env.CLIENT_URL
    );
  }
);

module.exports =
  router;
