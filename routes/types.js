const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/types");
const upload = require("../middleware/multer");

router.param("typeId", async (req, res, next, typeId) => {
  const foundType = await controller.fetchType(typeId, next);
  if (foundType) {
    req.type = foundType;
    next();
  } else next({ status: 404, message: "Type Not Found" });
});

router.get("/", controller.fetchTypes);

router.post("/", controller.createType);

router.get("/:typeId", controller.typeDetail);

router.put("/:typeId", controller.updateType);

router.delete("/:typeId", controller.deleteType);

module.exports = router;
