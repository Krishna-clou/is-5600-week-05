// db.js
const mongoose = require('mongoose')


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://rajaed7:TG4NGrQJMLFbwCJ4@cluster0.xbric.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Note you'll need to put in your own credentials here//
  // {
  //   useNewUrlParser: true,
  // }

/**
 * In this example we are connecting to a local MongoDB instance. This instance is running via docker-compose in our GitHub Codespaces environment.
 * In a real-world application, you would want to use a cloud-based MongoDB service like MongoDB Atlas.
 */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

)

module.exports = mongoose