const express = require("express");
const multer = require("multer");
const UrbanController = require("../controllers/gererUrban.controller");
const GuardAuth = require("./guardAuth");
const router = express.Router();
const nodemailer = require('nodemailer');

// Multer middleware configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  limits: {
    fieldSize: 25 * 1024 * 1024, // 20MB limit
  },
  storage: storage
});

// Routes
router.get("/GererUrban", UrbanController.getUrban);
router.get("/GererUrban/delete/:id", UrbanController.deleteUrbanController);
router.get('/GererUrban/download/:id', UrbanController.downloadUrbanController);
router.get("/ClientUrban", UrbanController.getUrban);

router.get("/GererUrban/update/:id", UrbanController.getUrbanUpdatePage);
router.post("/GererUrban/update", upload.single('Doc'), GuardAuth.isAuth, UrbanController.postUpdateUrbanController);

router.get("/addUrban", GuardAuth.isAuth, UrbanController.getAddUrbanController);
router.post("/addUrban", upload.single('Doc'), GuardAuth.isAuth, UrbanController.postAddUrbanController);

router.post('/sendEmail', UrbanController.sendEmail);


module.exports = router;
