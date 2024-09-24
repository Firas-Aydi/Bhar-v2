const GererEducationController = require("../controllers/GererEducation.controller");
const router = require("express").Router();
const multer = require("multer");
const GuardAuth = require("./guardAuth");

router.get("/GererEducation", GererEducationController.getAllNiveau);
router.get("/Niveau", GererEducationController.getAllNiveau);

module.exports = router;
