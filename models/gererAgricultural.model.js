const req = require("express/lib/request");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

var schemaAgricul = mongoose.Schema({
    Doc: {
        originalname: String,
        data: Buffer,
        contentType: String
    }
});

var Agricultural = mongoose.model("agricultural", schemaAgricul);
var url = "mongodb://0.0.0.0:27017/Bhar";

exports.getAgricultural = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Agricultural.find({});

            })
            .then((Agricultural) => {
                mongoose.disconnect();
                resolve(Agricultural);
            })
            .catch((err) => reject(err));
    });
};
exports.getPageUpdateAgriculturalModel = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Agricultural.findById(id);
            })
            .then((Agricultural) => {
                mongoose.disconnect();
                resolve(Agricultural);
            })
            .catch((err) => reject(err));
    });
};

exports.postUpdateAgriculturalModel = (AgriculturalId, fileData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Agricultural.findById(AgriculturalId);
            })
            .then((agricultural) => {
                agricultural.Doc.originalname = fileData.originalname;
                agricultural.Doc.data = fileData.data;
                agricultural.Doc.contentType = fileData.mimetype;
                return agricultural.save();
            })
            .then((updatedAgricultural) => {
                mongoose.disconnect();
                resolve("updated");
                //   console.log(updatedAgricultural);
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
};


exports.postDataAgriculturalModel = (fileData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                let agricultural = new Agricultural({
                    Doc: {
                        originalname: fileData.originalname,
                        data: fileData.data,
                        contentType: fileData.mimetype
                    }
                });
                return agricultural.save();
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


exports.deleteAgricultural = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Agricultural.deleteOne({ _id: id });
            })
            .then((agricultural) => {
                mongoose.disconnect();
                resolve(true);
            })
            .catch((err) => reject(err));
    });
};

exports.downloadFile = (fileId, res) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                Agricultural.findById(fileId)
                    .then((file) => {
                        if (!file) {
                            mongoose.disconnect(); // Disconnect from MongoDB
                            return res.status(404).send("File not found");
                        }

                        const fileData = file.Doc.data;
                        const contentType = file.Doc.contentType;
                        const fileName = file.Doc.originalname;

                        res.set("Content-Type", contentType);
                        res.set(
                            "Content-Disposition",
                            `attachment; filename="${encodeURIComponent(fileName)}"`
                        );

                        const fileStream = new Readable();
                        fileStream.push(fileData);
                        fileStream.push(null);

                        fileStream.pipe(res);

                        mongoose.disconnect(); // Disconnect from MongoDB after sending the file
                        resolve(); // Resolve the promise
                    })
                    .catch((err) => {
                        console.error(err);
                        mongoose.disconnect(); // Disconnect from MongoDB on error
                        reject(err); // Reject the promise with the error
                    });
            })
            .catch((err) => {
                console.error(err);
                reject(err); // Reject the promise with the error
            });
    });
};



