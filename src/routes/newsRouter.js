const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, newsController.create);
router.get("/all", newsController.findAll);

module.exports = router;