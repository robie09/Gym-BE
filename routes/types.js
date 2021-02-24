const express = require("express");
const controller = require("../controllers/types");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

router.param("typeId", async (req, res, next, typeId) => {
  const typeFound = await controller.fetchType(typeId, next);
  if (typeFound) {
    req.type = typeFound;
    next();
  } else {
    const error = new Error("Type Not Found");
    error.status = 404;
    next(error);
  }
});

// single: uploading one image only
// "image": the name of the model field where we want to save the image

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.typeList
);
router.get("/:typeId", controller.typeDetail);

router.put(
  "/:typeId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.typeUpdate
);
router.delete(
  "/:typeId",
  passport.authenticate("jwt", { session: false }),
  controller.typeDelete
);

module.exports = router;
