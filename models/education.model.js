// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// var schemaAuth = mongoose.Schema({
//   name: String,
//   lastname: String,
//   phone: Number,
//   password: String,
//   type: String,
// });

// var Education = mongoose.model("education", schemaAuth);
// var url = "mongodb://0.0.0.0:27017/Bhar";

// exports.registerFunctionModel = (name, lastname, phone, password, type) => {
//   // test phone if exist(true go to login) (false add new education)
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//       .then(() => {
//         return Education.findOne({ phone: phone });
//       })
//       .then((education) => {
//         if (education) {
//           mongoose.disconnect();
//           reject("phone is used");
//         } else {
//           return bcrypt.hash(password, 10);
//         }
//       })
//       .then((hPassword) => {
//         let education = new Education({
//           name: name,
//           lastname: lastname,
//           phone: phone,
//           password: hPassword,
//           type: type,
//         });
//         return education.save();
//       })
//       .then((education) => {
//         mongoose.disconnect();
//         resolve("registred");
//       })
//       .catch((err) => {
//         mongoose.disconnect();
//         reject(err);
//       });
//   });
// };

// exports.loginFunctionModel = (phone, password) => {
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//       .then(() => {
//         return Education.findOne({ phone: phone });
//       })
//       .then((education) => {
//         if (education) {
//           bcrypt.compare(password, education.password).then((verif) => {
//             if (verif) {
//               mongoose.disconnect();
//               resolve({ id: education._id, type: education.type });
//             } else {
//               mongoose.disconnect();
//               reject("incorrect phone or password");
//             }
//           });
//         } else {
//           mongoose.disconnect();
//           reject("incorrect phone or password");
//           // reject("we don't have this user");
//         }
//       }).catch((err) => {
//         mongoose.disconnect();
//         reject(err);
//       });
//   });
// };
