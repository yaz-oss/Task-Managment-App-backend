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

const bcrypt = require("bcryptjs");

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

app.use(cors(
  {
  origin: "https://task-management-app-frontend-sable.vercel.app",
  credentials: true
}
));

app.use(
  express.json()
);

app.use(
  passport.initialize()
);


// ROUTES


app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.get("/test", (req, res) => {
  res.send("Test route works");
});


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
  const ensureAdmin = async () => {
    try {
      const adminEmail = "ishimweyaziid749@gmail.com";
      const adminPassword = "yaz 2009"; // password includes a space as requested
      const adminUsername = "Admin";

      const existing = await User.findOne({ where: { email: adminEmail } });
      if (!existing) {
        const hashed = await bcrypt.hash(adminPassword, 10);
        await User.create({
          username: adminUsername,
          email: adminEmail,
          password: hashed,
          role: "admin",
        });
        console.log("Admin user created:", adminEmail);
      } else {
        // ensure role is admin
        if (existing.role !== "admin") {
          existing.role = "admin";
          await existing.save();
          console.log("Updated existing user to admin:", adminEmail);
        }
      }
    } catch (err) {
      console.error("Could not ensure admin user", err);
    }
  };

  ensureAdmin().finally(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

})

.catch((error) => {

  console.log(error);
});
