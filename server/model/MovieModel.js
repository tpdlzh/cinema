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
    rating:{
      type:Number,
      default:0
    },
    ratingTotal:{
      type:Number,
      default:0
    },
    ratingCounter:{
      type:Number,
      default:0
    },
    poster:{
      type:String
    },
    files:{
      type:Array
    }


  });

  const MovieModel = mongoose.model('Movie',Movie);

  module.exports = MovieModel;
