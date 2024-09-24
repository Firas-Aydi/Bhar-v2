const req = require("express/lib/request");
const mongoose = require("mongoose");

var schemaClasse = mongoose.Schema({
  Classe:String,
  Niveauid:String,
});

var Classe = mongoose.model("classe", schemaClasse);
// var url = "mongodb+srv://firasaydi:firas1999@bhar.a7jwa.mongodb.net/Bhar?retryWrites=true&w=majority&appName=Bhar" || "mongodb://0.0.0.0:27017/Bhar";
var url= process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/Bhar';

exports.getMyClasse = (niveauId) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Classe.find({ Niveauid: niveauId });
        })
        .then((classes) => {
          mongoose.disconnect();
          resolve(classes);
        })
        .catch((err) => reject(err));
    });
  };