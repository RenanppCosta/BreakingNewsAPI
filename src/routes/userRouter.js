const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const globalMiddleware = require("../middlewares/globalMiddlewares");

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", globalMiddleware.validId, globalMiddleware.validUser, userController.findById);
router.patch("/:id", globalMiddleware.validId, globalMiddleware.validUser, userController.update);

module.exports = router;