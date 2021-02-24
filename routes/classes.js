const express = require("express");
const controller = require("../controllers/classes");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");
const moment = require("moment");

router.param("classId", async (req, res, next, classId) => {
  console.log("hi");
  const classFound = await controller.fetchClass(classId, next);
  if (classFound) {
    req.class = classFound;
    console.log(req.class);

    next();
  } else {
    console.log("bey");
    const error = new Error("Class Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", controller.ClassList);

router.get("/:classId", controller.classDetail);
router.put("/:classId", upload.single("image"), controller.classUpdate);
router.delete("/:classId", controller.classDelete);

router.post(
  "/:classId/types",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.classTypeCreate
);

module.exports = router;
