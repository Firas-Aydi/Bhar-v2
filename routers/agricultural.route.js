const express = require("express");
const multer = require("multer");
const AgriculturalController = require("../controllers/gererAgricultural.controller");
const GuardAuth = require("./guardAuth");
const router = express.Router();

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
router.get("/GererAgricultural", AgriculturalController.getAgricultural);
router.get("/GererAgricultural/delete/:id", AgriculturalController.deleteAgriculturalController);
router.get('/GererAgricultural/download/:id', AgriculturalController.downloadAgriculturalController);
router.get("/ClientAgricultural", AgriculturalController.getAgricultural);

router.get("/GererAgricultural/update/:id", AgriculturalController.getAgriculturalUpdatePage);
router.post("/GererAgricultural/update", upload.single('Doc'), GuardAuth.isAuth, AgriculturalController.postUpdateAgriculturalController);

router.get("/addAgricultural", GuardAuth.isAuth, AgriculturalController.getAddAgriculturalController);
router.post("/addAgricultural", upload.single('Doc'), GuardAuth.isAuth, AgriculturalController.postAddAgriculturalController);

router.post('/sendEmail', AgriculturalController.sendEmail);

module.exports = router;
