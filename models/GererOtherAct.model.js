const req = require("express/lib/request");
const mongoose = require("mongoose");

var schemaOtherAct = mongoose.Schema({
    Title: String,
    Image: String,
});

var OthAct = mongoose.model("Other Activitie", schemaOtherAct);
var url = "mongodb://0.0.0.0:27017/Bhar";

exports.getAllPhoto = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return OthAct.find({});
            })
            .then((OthAct) => {
                mongoose.disconnect();
                resolve(OthAct);
            })
            .catch((err) => reject(err));
    });
};
exports.postDataPhotoModel = (Title, Image,) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                let othAct = new OthAct({
                    Title: Title,
                    Image: Image,
                });
                return othAct.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve("added");
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.deletephoto = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return OthAct.deleteOne({ _id: id });
            })
            .then((othAct) => {
                mongoose.disconnect();
                resolve(true);
            })
            .catch((err) => reject(err));
    });
};
