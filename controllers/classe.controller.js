const classeModel = require("../models/classe.model");

exports.getClasseByNiveauPage = (req, res, next) => {
    if(req.session.type=="admin"){}
    let id = req.params.id
    classeModel.getMyClasse(id)
        .then(classe => {
            // console.log(book)
            res.render('Classes', { classe: classe, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type })
        })
}