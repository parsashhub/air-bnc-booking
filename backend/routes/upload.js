const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const downloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

router.post("/byLink", authMiddleware, async (req, res) => {
  const { link } = req.body;
  let name = "photo" + Date.now() + ".jpg";

  try {
    await downloader.image({
      url: link,
      dest: __dirname.slice(0, -6) + "uploads/" + name,
    });

    res.send({ message: "uploaded", data: name });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
const photosMiddleware = multer({ dest: __dirname.slice(0, -6) + "uploads/" });
router.post(
  "/",
   photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace(__dirname.slice(0, -6) + "uploads/", ""));
    }
    res.json(uploadedFiles);
  },
);

module.exports = router;
