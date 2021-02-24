const express = require("express");
const controller = require("../controllers/gyms");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

router.param("gymId", async (req, res, next, gymId) => {
  console.log("hi");
  const gymFound = await controller.fetchGym(gymId, next);
  if (gymFound) {
    req.gym = gymFound;
    console.log(req.gym);

    next();
  } else {
    console.log("bey");
    const error = new Error("Gym Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", controller.gymList);
router.post(
  "/",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  controller.gymCreate
);

router.post(
  "/:gymId/classes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.classCreate
);

module.exports = router;
