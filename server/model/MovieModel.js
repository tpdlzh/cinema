const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const Movie = new Schema({

  	title:{
  		type:String
  	},
  	genre:{
  		type:String
  	},
  	actors:{
  		type:String
  	},
  	directors:{
  		type:String
  	},
  	release:{
  		type:String
  	},
    description:{
      type:String
    },
    files:{
      type:Array
    }


  });

  const MovieModel = mongoose.model('Movie',Movie);

  module.exports = MovieModel;
