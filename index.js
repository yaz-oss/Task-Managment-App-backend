require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const sequelize =
require("./config/db");

const passport =
require("passport");

require("./config/passport");

const User =
require("./models/user");

const Task =
require("./models/task");

const authRoutes =
require("./routes/authRoutes");

const taskRoutes =
require("./routes/taskRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const userRoutes =
require("./routes/userRoutes");


// RELATIONS

User.hasMany(Task);

Task.belongsTo(User);


const app =
express();


// MIDDLEWARE

app.use(
  cors({

    origin:
      "http://localhost:5173",

    credentials:
      true,
  })
);

app.use(
  express.json()
);

app.use(
  passport.initialize()
);


// ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/users",
  userRoutes
);


// SERVER

sequelize.sync({
  alter: true,
})

.then(() => {

  app.listen(
    5000,

    () => {

      console.log(
        "Server running on port 5000"
      );
    }
  );
})

.catch((error) => {

  console.log(error);
});
