const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({

  movieId:{
    type:String
  },
  comment:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  }


});

const CommentModel = mongoose.model('Comment',Comment);

module.exports = CommentModel;
