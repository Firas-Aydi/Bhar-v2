const authModel = require("../models/auth.model");
const educationModel = require("../models/education.model");

exports.getRegisterPage = (req, res, next) => {
  const type = req.query.type;
  // console.log(`You clicked on ${type}`);
  res.render("register", { verifUser: req.session.userId, message: req.flash('error')[0], type: type });
};

exports.postRegisterData = (req, res, next) => {
  authModel
    .registerFunctionModel(req.body.name, req.body.lastname, req.body.phone, req.body.address, req.body.password, req.body.type)
    .then((user) => {
      res.redirect("/login");
    })
    .catch((msg) => {
      console.log(msg);
      req.flash("error", msg);
      res.redirect(`/register?type=${req.body.type}`);
    });
};

// exports.getRegisterPage1 = (req, res, next) => {
//   const type = req.query.type;
//   console.log(`You clicked on ${type}`);

//   res.render("register1", { verifUser: req.session.userId, message: req.flash('error')[0], type: type });
// };

// exports.postRegisterData1 = (req, res, next) => {
//   educationModel
//     .registerFunctionModel(req.body.name, req.body.lastname, req.body.phone, req.body.password, req.body.type)
//     .then((user) => {
//       res.redirect("/login");
//     })
//     .catch((msg) => {
//       console.log(msg);
//       req.flash("error", msg);
//       res.redirect("/register1");
//     });
// };

exports.getLoginPage = (req, res, next) => {
  res.render("login", { verifUser: req.session.userId, message: req.flash('error')[0], verifType: req.session.type });
};

exports.postLoginData = (req, res, next) => {
  authModel
    .loginFunctionModel(req.body.phone, req.body.password)
    .then((data) => {
      // const id = data.id;
      // const type = data.type;
      req.session.userId = data.id;
      req.session.type = data.type;
      res.redirect("/");
      console.log(req.session.userId)
      console.log(req.session.type)
    })
    .catch((msg) => {
      // this.postLoginData1(req, res, next)
      console.log(msg);
      req.flash("error", msg);
      res.redirect("/login");
    });
};
// exports.postLoginData1 = (req, res, next) => {
//   educationModel
//     .loginFunctionModel(req.body.phone, req.body.password)
//     .then((data) => {
//       req.session.userId = data.id;
//       req.session.type = data.type;
//       res.redirect("/");
//       // console.log(req.session.userId)
//       // console.log(req.session.type)

//     })
//     .catch((msg) => {
//       console.log(msg);
//       req.flash("error", msg);
//       res.redirect("/login");
//     });
// };

exports.logoutFunctionController = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

