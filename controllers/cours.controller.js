const coursModel = require("../models/cours.model");
const path = require('path');
const fs = require('fs');

exports.getCoursByClassePage = (req, res, next) => {
  if (req.session.type == "admin") {

    let id = req.params.id
    coursModel.getMyCour(id)
      .then(cour => {
        // console.log(cour )
        res.render('Cour', { idClass: id, cour: cour, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type })
      })
  } else {
    let id = req.params.id
    coursModel.getMyCour(id)
      .then(cour => {
        // console.log(cour )
        res.render('afficherCour', { idClass: id, cour: cour, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type })
      })
  }
}

exports.getCoursUpdatePage = (req, res, next) => {
  let id = req.params.id
  coursModel.getPageUpdateCoursModel(id)
    .then(cour => {
      // console.log(cour)
      res.render('updateCour', { courUpdate: cour, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type })
    })
}

// exports.postUpdateCoursController = (req, res, next) => {
//   if (req.file) {
//     coursModel
//       .postUpdateCoursModel(req.body.courId, req.body.Title, req.file.filename, req.body.Classeid)
//       .then((msg) => {
//         console.log('Classeid:', req.body.Classeid);

//         req.flash('Successmessage', msg); // Pass the success message as a string
//         res.redirect(`/cour/${req.body.Classeid}`);
//       })
//       .catch((err) => {
//         req.flash('Errormessage', err.message); // Access the error message from the error object
//         res.redirect(`/cour/update/${req.body.courId}`);
//       });
//   } else {
//     coursModel
//       .postUpdateCoursModel(req.body.courId, req.body.Title, req.body.oldDoc, req.body.Classeid)
//       .then((msg) => {
//         req.flash('Successmessage', msg); // Pass the success message as a string
//         res.redirect(`/cour/${req.body.Classeid}`);
//       })
//       .catch((err) => {
//         req.flash('Errormessage', err.message); // Access the error message from the error object
//         res.redirect(`/cour/update/${req.body.courId}`);
//       });
//   }
// };
exports.postUpdateCoursController = (req, res, next) => {
  if (req.file) {
    const fileData = {
      // data: req.file.buffer,
      // mimetype: req.file.mimetype
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
      originalname: req.file.originalname
    };

    coursModel
      .postUpdateCoursModel(req.body.courId, req.body.Title, fileData, req.body.Classeid)
      .then((msg) => {
        // console.log('Classeid:', req.body.Classeid);

        req.flash('Successmessage', msg); // Pass the success message as a string
        res.redirect(`/cour/${req.body.Classeid}`);
      })
      .catch((err) => {
        req.flash('Errormessage', err.message); // Access the error message from the error object
        res.redirect(`/cour/update/${req.body.courId}`);
      });
  } else {
    coursModel
      .postUpdateCoursModel(req.body.courId, req.body.Title, null, req.body.Classeid)
      .then((msg) => {
        req.flash('Successmessage', msg); // Pass the success message as a string
        res.redirect(`/cour/${req.body.Classeid}`);
      })
      .catch((err) => {
        req.flash('Errormessage', err.message); // Access the error message from the error object
        res.redirect(`/cour/update/${req.body.courId}`);
      });
  }
};


exports.getAddCoursController = (req, res, next) => {
  let id = req.params.id
  // console.log(id)
  res.render("Cour", { idClass: id, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type });
};

// exports.postAddCoursController = (req, res, next) => {
//   console.log("req.body: ")
//   console.log(req.body)
//   console.log("req.file: ")
//   console.log(req.file)
//   coursModel.postDataCoursModel(req.body.Title, req.file.path, req.body.Classeid)
//     .then((msg) => {
//       req.flash('Successmessage', msg);
//       const previousPage = req.header('Referer') || '/'; // Default to the homepage if no referring URL is available
//       res.redirect(previousPage);
//     })
//     .catch((err) => {
//       req.flash('Errormessage', err);
//       const previousPage = req.header('Referer') || '/'; // Default to the homepage if no referring URL is available
//       res.redirect(previousPage);
//     });
// };
exports.postAddCoursController = (req, res, next) => {
  console.log("req.body: ");
  console.log(req.body);
  console.log("req.file: ");
  console.log(req.file);

  const fileData = {
    data: fs.readFileSync(req.file.path),
    contentType: req.file.mimetype,
    originalname: req.file.originalname
  };

  coursModel.postDataCoursModel(req.body.Title, fileData, req.body.Classeid)
    .then((msg) => {
      req.flash('Successmessage', msg);
      res.redirect('back'); // Redirect to the previous page
    })
    .catch((err) => {
      req.flash('Errormessage', err);
      res.redirect('back'); // Redirect to the previous page
    });
};

exports.deleteCourController = (req, res, next) => {
  let id = req.params.id;
  coursModel.deletecour(id)
    .then((verif) => {
      console.log(verif);
      const previousPage = req.header('Referer') || '/';
      res.redirect(previousPage);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.downloadCourController = (req, res, next) => {
  const courId = req.params.id;

  coursModel.downloadFile(courId, res)
    .then(() => {
      // File download successful
      console.log('File download successful');
    })
    .catch((err) => {
      // Error occurred during file download
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

