const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var schemaAuth = mongoose.Schema({
  name: String,
  lastname: String,
  phone: Number,
  address: String,
  password: String,
  type: String,
});

var User = mongoose.model("user", schemaAuth);
var url = "mongodb://0.0.0.0:27017/Bhar";

exports.registerFunctionModel = (name, lastname, phone, address, password, type) => {
  // test phone if exist(true go to login) (false add new user)
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.findOne({ phone: phone });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("phone is used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hPassword) => {
        let user = new User({
          name: name,
          lastname: lastname,
          phone: phone,
          address: address,
          password: hPassword,
          type: type,
        });
        return user.save();
      })
      .then((user) => {
        mongoose.disconnect();
        resolve("registred");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.loginFunctionModel = (phone, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.findOne({ phone: phone });
      })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((verif) => {
            if (verif) {
              mongoose.disconnect();
              resolve({ id: user._id, type: user.type });
            } else {
              mongoose.disconnect();
              reject("incorrect phone or password ");
            }
          });
        } else {
          mongoose.disconnect();
          reject("incorrect phone or password");
          // reject("we don't have this user");
        }
      }).catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
