const { Router } = require("express");
const userController = require("../../controllers/user");

const router = Router();

// GET: /api/user/profile
router.use("/profile", userController.profile);

router.use("/PostProperty", userController.PostProperty)

router.use("/GetProperties", userController.GetPropertyByPage);

router.use("/GetSingleProperty", userController.GetSingleProperty)
module.exports = router;
