const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, newsController.create);
router.get("/all", newsController.findAll);
router.get("/top", newsController.topNews);
router.get("/search", newsController.searchByTitle);

router.get("/:id", authMiddleware, newsController.findById);

module.exports = router;