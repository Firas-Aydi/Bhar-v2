const GereMarineModel = require("../models/GererMarine.model");

exports.getAllPhoto = (req, res, next) => {
    GereMarineModel.getAllPhoto().then((photo) => {
        res.render("GererMarine", { photo: photo, verifUser: req.session.userId, verifType: req.session.type });
    });
};
exports.deletePhotoController = (req, res, next) => {
    let id = req.params.id
    GereMarineModel.deletephoto(id).then((verif) => {
        // console.log(verif)
        res.redirect('/GererMarine')
    }).catch((err) => {
        console.log(err)
    })
}
exports.getAddPhotoController = (req, res, next) => {
    res.render("addPhoto", { verifType: req.session.type, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0] });
};

exports.postAddPhotoController = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    GereMarineModel.postDataPhotoModel(req.body.titre, req.file.filename).then((msg) => {
        req.flash('Successmessage', msg)
        res.redirect('/GererMarine')
    }).catch((err) => {
        req.flash('Errormessage', err)
        res.redirect('/GererMarine')
    })
};

exports.getAllPhotoClient = (req, res, next) => {
    GereMarineModel.getAllPhoto().then((photo) => {
        res.render("ClientMarine", { photo: photo, verifUser: req.session.userId, verifType: req.session.type });
    });
};
exports.viewImageController = (req, res, next) => {
    // console.log("image:"+req.query.image)
    // console.log("title:"+req.query.title)
    const imageUrl = req.query.image;
    const imageTitle = req.query.title;
    res.render("viewimage", { imageUrl, imageTitle, verifUser: req.session.userId, verifType: req.session.type });
};


