const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  work: {
    type:String,
    required:true,
  },
  date:{
    type: Date,
    default: Date.now,
    required: true,
  }
});

const todo = mongoose.model('todo', userSchema);
module.exports = todo;
