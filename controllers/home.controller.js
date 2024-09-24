const bookModel = require("../models/book.model");
const i18n = require("i18n");

exports.homeController = (req, res, next) => {
  // const greeting = i18n.__("greeting"); // Translate the greeting
  // const farewell = i18n.__("farewell"); // Translate the farewell
  bookModel.getThreeBooks().then((books) => {
    res.render("index", { books: books, verifUser: req.session.userId, verifType: req.session.type });
  });
};





