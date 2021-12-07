const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/stage'; 
mongoose.connect(mongoDB,{ useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.Promise = global.Promise;
console.log("DB connected successfully...")
module.exports = mongoose;

