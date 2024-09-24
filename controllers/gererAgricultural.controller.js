const AgriculturalModel = require("../models/gererAgricultural.model");
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer')

exports.getAgricultural = (req, res, next) => {
    if (req.session.type == "admin") {
        AgriculturalModel.getAgricultural()
            .then(agricul => {
                // console.log(cour )
                res.render('Agricultural', { agricul: agricul, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type })
            })
    } else {
        AgriculturalModel.getAgricultural()
            .then(agricul => {
                // console.log(cour )
                res.render('ClientAgricultural', { agricul: agricul, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type })
            })
    }
}

exports.getAgriculturalUpdatePage = (req, res, next) => {
    let id = req.params.id
    AgriculturalModel.getPageUpdateAgriculturalModel(id)
        .then(agricul => {
            // console.log(agricul)
            res.render('updateAgricultural', { agriculUpdate: agricul, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type })
        })
}

exports.postUpdateAgriculturalController = (req, res, next) => {
    if (req.file) {
        const fileData = {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
            originalname: req.file.originalname
        };

        AgriculturalModel.postUpdateAgriculturalModel(req.body.AgriculturalId, fileData)
            .then((msg) => {
                req.flash('Successmessage', msg); // Pass the success message as a string
                res.redirect(`/GererAgricultural`);
            })
            .catch((err) => {
                req.flash('Errormessage', err.message); // Access the error message from the error object
                res.redirect(`/GererAgricultural/update/${req.body.AgriculturalId}`);
            });
    } else {
        AgriculturalModel
            .postUpdateCoursModel(req.body.AgriculturalId, null)
            .then((msg) => {
                req.flash('Successmessage', msg); // Pass the success message as a string
                res.redirect(`/GererAgricultural`);
            })
            .catch((err) => {
                req.flash('Errormessage', err.message); // Access the error message from the error object
                res.redirect(`/GererAgricultural/update/${req.body.AgriculturalId}`);
            });
    }
};
exports.getAddAgriculturalController = (req, res, next) => {
    res.render("addAgricultural", { verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0], verifType: req.session.type });
};

exports.postAddAgriculturalController = (req, res, next) => {
    console.log("req.body: ");
    console.log(req.body);
    console.log("req.file: ");
    console.log(req.file);

    const fileData = {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
        originalname: req.file.originalname
    };

    AgriculturalModel.postDataAgriculturalModel(fileData)
        .then((msg) => {
            req.flash('Successmessage', msg);
            res.redirect('GererAgricultural'); // Redirect to the previous page
        })
        .catch((err) => {
            req.flash('Errormessage', err);
            // res.redirect('back'); // Redirect to the previous page
        });
};

exports.deleteAgriculturalController = (req, res, next) => {
    let id = req.params.id;
    AgriculturalModel.deleteAgricultural(id)
        .then((verif) => {
            console.log(verif);
            const previousPage = req.header('Referer') || '/';
            res.redirect(previousPage);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.downloadAgriculturalController = (req, res, next) => {
    const AgriculturalId = req.params.id;

    AgriculturalModel.downloadFile(AgriculturalId, res)
        .then(() => {
            // File download successful
            console.log('File download successful');
        })
        .catch((err) => {
            // Error occurred during file download
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'firasaydi0@gmail.com',
      pass: 'nqqqksvvulzjcpuz'
    }
  })
  exports.sendEmail = (req, res) => {
    console.log("req.body: ",req.body);
    const mailOptions = {
      from: `${req.body.email}`,
      // from: 'firasaydi0@gmail.com',
      to: 'firas24411598@gmail.com',
      subject: req.body.subject,
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    }
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send(`
          <div style="border: 1px solid #dc3545; background-color: #f8d7da; color: #721c24; padding: 10px; margin-bottom: 10px;">
            <strong>Failed to send email.</strong> Please try again later.
          </div>
        `); // Send error message as HTML
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send(`
          <div style="border: 1px solid #28a745; background-color: #d4edda; color: #155724; padding: 10px; margin-bottom: 10px;">
            <strong>Email sent successfully!</strong> Thank you for reaching out.
          </div>
        `); // Send success message as HTML
      }    
    })
  }
  