const req = require("express/lib/request");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

var schemaCour = mongoose.Schema({
    Classeid: String,
    // Title: String,
    Doc: {
        originalname:String,
        data: Buffer,
        contentType: String
    }
});

var Cour = mongoose.model("cour", schemaCour);
var url = "mongodb+srv://firasaydi:firas1999@bhar.a7jwa.mongodb.net/Bhar?retryWrites=true&w=majority&appName=Bhar" || "mongodb://0.0.0.0:27017/Bhar";

exports.getMyCour = (Classeid) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Cour.find({ Classeid: Classeid });

            })
            .then((Cour) => {
                mongoose.disconnect();
                resolve(Cour);
            })
            .catch((err) => reject(err));
    });
};
exports.getPageUpdateCoursModel = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Cour.findById(id);
            })
            .then((Cour) => {
                mongoose.disconnect();
                resolve(Cour);
            })
            .catch((err) => reject(err));
    });
};

// exports.postUpdateCoursModel = (courId, Title, Doc, Classeid) => {
//     return new Promise((resolve, reject) => {
//         mongoose
//             .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(() => {
//                 return Cour.updateOne({ _id: courId }, {
//                     Title: Title,
//                     Doc: Doc,
//                     Classeid: Classeid,
//                 });
//             })
//             .then((Cour) => {
//                 mongoose.disconnect();
//                 resolve("updated");
//                 console.log(Cour)
//             })
//             .catch((err) => {
//                 mongoose.disconnect();
//                 reject(err);
//                 // console.log(Cour)
//             });
//     });
// };
exports.postUpdateCoursModel = (courId, Title, fileData, Classeid) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Cour.findById(courId);
            })
            .then((cour) => {
                // Update the fields of the cour document
                // cour.Title = Title;
                cour.Doc.originalname = fileData.originalname;
                cour.Doc.data = fileData.data;
                cour.Doc.contentType = fileData.mimetype;
                cour.Classeid = Classeid;

                return cour.save();
            })
            .then((updatedCour) => {
                mongoose.disconnect();
                resolve("updated");
                //   console.log(updatedCour);
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
};


// exports.postDataCoursModel = ( Title, Doc, Classeid) => {
//     return new Promise((resolve, reject) => {
//       mongoose
//         .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => {
//           let cour = new Cour({
//             Title: Title,
//             Doc: Doc,
//             Classeid: Classeid,
//           });
//           console.log(cour)
//           return cour.save();
//         })
//         .then(() => {
//           mongoose.disconnect();
//           resolve("added");
//         })
//         .catch((err) => {
//           mongoose.disconnect();
//           reject(err);
//         });
//     });
//   };
exports.postDataCoursModel = (Title, fileData, Classeid) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                let cour = new Cour({
                    // Title: fileData.originalname,
                    Doc: {
                        originalname: fileData.originalname,
                        data: fileData.data,
                        contentType: fileData.mimetype
                    },
                    Classeid: Classeid,
                });
                //   console.log(contentType);
                return cour.save();
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


exports.deletecour = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return Cour.deleteOne({ _id: id });
            })
            .then((cours) => {
                mongoose.disconnect();
                resolve(true);
            })
            .catch((err) => reject(err));
    });
};

exports.downloadFile = (fileId, res) => {
    return new Promise((resolve, reject) => {
      // Connect to MongoDB
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          // MongoDB connected, proceed with finding the file
          Cour.findById(fileId)
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
  


