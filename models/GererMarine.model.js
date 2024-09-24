const req = require("express/lib/request");
const mongoose = require("mongoose");

var schemaMarine = mongoose.Schema({
    Title: String,
    Image: String,
});

var Marine = mongoose.model("marine", schemaMarine);
var url = "mongodb://0.0.0.0:27017/Bhar";

exports.getAllPhoto = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Marine.find({});
            })
            .then((Marine) => {
                mongoose.disconnect();
                resolve(Marine);
            })
            .catch((err) => reject(err));
    });
};
exports.postDataPhotoModel = (Title, Image,) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                let marine = new Marine({
                    Title: Title,
                    Image: Image,
                });
                return marine.save();
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
                return Marine.deleteOne({ _id: id });
            })
            .then((marine) => {
                mongoose.disconnect();
                resolve(true);
            })
            .catch((err) => reject(err));
    });
};
