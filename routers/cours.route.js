// const CoursController = require("../controllers/cours.controller");
// const router = require("express").Router();
// const multer = require("multer");
// const GuardAuth = require("./guardAuth");
// const route=require('./auth.route')

// router.get("/cour/:id", CoursController.getCoursByClassePage);
// router.get("/delete/:id", CoursController.deleteCourController);
// router.get('/download/:id', CoursController.downloadCourController);

// router.get("/update/:id", CoursController.getCoursUpdatePage);
// router.post("/update",multer({
//     storage: multer.diskStorage({
//      destination: function (req, file, cb) {
//        cb(null, 'assets/uploads');
//      },
//      filename: function (req, file, cb) {
//        cb(null, Date.now() + '-' + file.originalname);
//      }
//    })
//  }).single(['Doc']), GuardAuth.isAuth, CoursController.postUpdateCoursController);

//  route.get("/cour", GuardAuth.isAuth, CoursController.getAddCoursController);
// route.post("/cour",multer({
//    storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'assets/uploads');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   })
// }).single(['Doc']), GuardAuth.isAuth, CoursController.postAddCoursController);


// module.exports = router;

const express = require("express");
const multer = require("multer");
const CoursController = require("../controllers/cours.controller");
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
router.get("/cour/:id", CoursController.getCoursByClassePage);
router.get("/delete/:id", CoursController.deleteCourController);
router.get('/download/:id', CoursController.downloadCourController);

router.get("/update/:id", CoursController.getCoursUpdatePage);
router.post("/update", upload.single('Doc'), GuardAuth.isAuth, CoursController.postUpdateCoursController);

router.get("/cour", GuardAuth.isAuth, CoursController.getAddCoursController);
router.post("/cour", upload.single('Doc'), GuardAuth.isAuth, CoursController.postAddCoursController);

module.exports = router;
