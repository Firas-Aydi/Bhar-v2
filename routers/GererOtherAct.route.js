const GererOtherActController = require("../controllers/GererOtherAct.controller");
const router = require("express").Router();
const multer = require("multer");
const route=require('./auth.route')
const GuardAuth = require("./guardAuth");

router.get("/ClientOtherAct", GererOtherActController.getAllPhotoClient);
router.get("/GererOtherAct", GererOtherActController.getAllPhoto);
router.get("/viewimage", GererOtherActController.viewImageController);


router.get("/photo/deleteOthAct/:id", GererOtherActController.deletePhotoController);
route.get("/addphotoOthAct", GuardAuth.isAuth, GererOtherActController.getAddPhotoController);
route.post("/addphotoOthAct",multer({
   storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
}).single(['image']), GuardAuth.isAuth, GererOtherActController.postAddPhotoController);

module.exports = router;