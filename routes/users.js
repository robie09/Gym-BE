const express = require("express");
const controller = require("../controllers/users");
const passport = require("passport");
const router = express.Router();

router.param("userId", async (req, res, next, userId) => {
  console.log("hi");
  const userFound = await controller.fetchUser(userId, next);
  if (userFound) {
    req.class = userFound;
    console.log(req.user);

    next();
  } else {
    console.log("bey");
    const error = new Error("User Not Found");
    error.status = 404;
    next(error);
  }
});

router.post("/signup", controller.signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  controller.signin
); // will explain session false LATER
router.get("/", controller.userList);

module.exports = router;
