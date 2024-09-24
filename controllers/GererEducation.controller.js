const GererEducationModel = require("../models/educationNiveau.model");

exports.getAllNiveau = (req, res, next) => {
    GererEducationModel.getAllNiveau().then((niveaux) => {
    res.render("GererEducation", {niveaux:niveaux, verifUser: req.session.userId,verifType: req.session.type});
  });
};
