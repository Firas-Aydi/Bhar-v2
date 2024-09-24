const GererMarineController = require("../controllers/GererMarine.controller");
const router = require("express").Router();
const multer = require("multer");
const route=require('./auth.route')
const GuardAuth = require("./guardAuth");

router.get("/ClientMarine", GererMarineController.getAllPhotoClient);
router.get("/GererMarine", GererMarineController.getAllPhoto);
router.get("/viewimage", GererMarineController.viewImageController);


router.get("/photo/delete/:id", GererMarineController.deletePhotoController);
route.get("/addphoto", GuardAuth.isAuth, GererMarineController.getAddPhotoController);
route.post("/addphoto",multer({
   storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
}).single(['image']), GuardAuth.isAuth, GererMarineController.postAddPhotoController);

module.exports = router;