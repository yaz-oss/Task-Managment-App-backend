const express =
require("express");

const router =
express.Router();

const User =
require("../models/user");

router.get(
  "/",

  async (req, res) => {

    try {

      const users =
        await User.findAll();

      res.json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error fetching users",
      });
    }
  }
);

module.exports =
router;
