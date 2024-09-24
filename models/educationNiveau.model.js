const req = require("express/lib/request");
const mongoose = require("mongoose");

var schemaNiveau = mongoose.Schema({
  Niveau:String,
});

var Niveau = mongoose.model("niveau", schemaNiveau);
var url = "mongodb://0.0.0.0:27017/Bhar";

exports.getAllNiveau = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Niveau.find({});
        })
        .then((Niveaux) => {
          mongoose.disconnect();
          resolve(Niveaux);
        })
        .catch((err) => reject(err));
    });
  };
