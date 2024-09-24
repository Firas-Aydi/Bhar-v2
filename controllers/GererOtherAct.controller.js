const GereOtherActModel = require("../models/GererOtherAct.model");

exports.getAllPhoto = (req, res, next) => {
    GereOtherActModel.getAllPhoto().then((photo) => {
        res.render("GererOtherAct", { photo: photo, verifUser: req.session.userId, verifType: req.session.type });
    });
};
exports.deletePhotoController = (req, res, next) => {
    let id = req.params.id
    GereOtherActModel.deletephoto(id).then((verif) => {
        // console.log(verif)
        res.redirect('/GererOtherAct')
    }).catch((err) => {
        console.log(err)
    })
}
exports.getAddPhotoController = (req, res, next) => {
    res.render("addphotoOthAct", { verifType: req.session.type, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0] });
};

exports.postAddPhotoController = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    GereOtherActModel.postDataPhotoModel(req.body.titre, req.file.filename).then((msg) => {
        req.flash('Successmessage', msg)
        res.redirect('/GererOtherAct')
    }).catch((err) => {
        req.flash('Errormessage', err)
        res.redirect('/GererOtherAct')
    })
};

exports.getAllPhotoClient = (req, res, next) => {
    GereOtherActModel.getAllPhoto().then((photo) => {
        res.render("ClientOtherAct", { photo: photo, verifUser: req.session.userId, verifType: req.session.type });
    });
};
exports.viewImageController = (req, res, next) => {
    // console.log("image:"+req.query.image)
    // console.log("title:"+req.query.title)
    const imageUrl = req.query.image;
    const imageTitle = req.query.title;
    res.render("viewimage", { imageUrl, imageTitle, verifUser: req.session.userId, verifType: req.session.type });
};

