const express = require("express");
const passport = require("passport");
const db = require("./db/models");

const typeRoutes = require("./routes/types");
const gymRoutes = require("./routes/gyms");

const classRoutes = require("./routes/classes");
const userRoutes = require("./routes/users");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const cors = require("cors");
const app = express();
const path = require("path");

// Middleware
app.use(express.json());
app.use(cors());

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/gyms", gymRoutes);

app.use("/types", typeRoutes);
app.use("/classes", classRoutes);
app.use(userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const PORT = 8001;
db.sequelize.sync({ alter: true });
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
