const req = require('express/lib/request')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const { Readable } = require('stream')

var schemaUrban = mongoose.Schema({
  Doc: {
    originalname: String,
    data: Buffer,
    contentType: String
  }
})

var Urban = mongoose.model('urban', schemaUrban)
var url = 'mongodb://0.0.0.0:27017/Bhar'

exports.getUrban = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Urban.find({})
      })
      .then(Urban => {
        mongoose.disconnect()
        resolve(Urban)
      })
      .catch(err => reject(err))
  })
}
exports.getPageUpdateUrbanModel = id => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Urban.findById(id)
      })
      .then(Urban => {
        mongoose.disconnect()
        resolve(Urban)
      })
      .catch(err => reject(err))
  })
}

exports.postUpdateUrbanModel = (UrbanId, fileData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Urban.findById(UrbanId)
      })
      .then(urban => {
        urban.Doc.originalname = fileData.originalname
        urban.Doc.data = fileData.data
        urban.Doc.contentType = fileData.mimetype
        return urban.save()
      })
      .then(updatedUrban => {
        mongoose.disconnect()
        resolve('updated')
        //   console.log(updatedUrban);
      })
      .catch(err => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
exports.postDataUrbanModel = fileData => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        let urban = new Urban({
          Doc: {
            originalname: fileData.originalname,
            data: fileData.data,
            contentType: fileData.mimetype
          }
        })
        return urban.save()
      })
      .then(() => {
        mongoose.disconnect()
        resolve('added')
      })
      .catch(err => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
exports.deleteUrban = id => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Urban.deleteOne({ _id: id })
      })
      .then(urban => {
        mongoose.disconnect()
        resolve(true)
      })
      .catch(err => reject(err))
  })
}

exports.downloadFile = (fileId, res) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        Urban.findById(fileId)
          .then(file => {
            if (!file) {
              mongoose.disconnect() // Disconnect from MongoDB
              return res.status(404).send('File not found')
            }

            const fileData = file.Doc.data
            const contentType = file.Doc.contentType
            const fileName = file.Doc.originalname

            res.set('Content-Type', contentType)
            res.set(
              'Content-Disposition',
              `attachment; filename="${encodeURIComponent(fileName)}"`
            )

            const fileStream = new Readable()
            fileStream.push(fileData)
            fileStream.push(null)

            fileStream.pipe(res)

            mongoose.disconnect() // Disconnect from MongoDB after sending the file
            resolve() // Resolve the promise
          })
          .catch(err => {
            console.error(err)
            mongoose.disconnect() // Disconnect from MongoDB on error
            reject(err) // Reject the promise with the error
          })
      })
      .catch(err => {
        console.error(err)
        reject(err) // Reject the promise with the error
      })
  })
}
