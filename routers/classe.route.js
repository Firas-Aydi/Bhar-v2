const ClasseController = require("../controllers/classe.controller");
const router = require("express").Router();
const multer = require("multer");
const GuardAuth = require("./guardAuth");

router.get("/classe/:id", ClasseController.getClasseByNiveauPage);


module.exports = router;
