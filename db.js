// db.js
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://rajaed7:TG4NGrQJMLFbwCJ4@cluster0.xbric.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Note you'll need to put in your own credentials here//
  // {
  //   useNewUrlParser: true,
  // }
)

module.exports = mongoose