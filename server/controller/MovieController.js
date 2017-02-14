'use strict';
const gm = require('gm');
const Movie = require("mongoose").model("Movie");

/**
 * Fetch movie list
 *
 */

exports.getMovieList = function(req,res){
    Movie.find({},function(err,data){
      if(err) console.log(err);
      res.json(data);
    })
}

/**
 * Update movie rating
 *
 */

exports.updateRating = function(req,res){
    let id = req.body.id;
    let rating = req.body.rating;

    Movie.findOne({_id:id},function(err,movie){
      if(err) console.log(err);
      movie.ratingCounter++;
      movie.ratingTotal += rating;
      movie.rating = movie.ratingTotal/movie.ratingCounter;
      movie.save((err)=>{
        if(err) console.error(err);
      });

      res.end();
    })

}



/**
 * Store Movie details
 *
 */

exports.uploadMovie = function(req,res){

   let i = 0;
   let fileNames = [];
   req.files.forEach(function(imageValues, key) {
     var poster = req.body.poster;
      var filename = imageValues.filename;
      if(poster!=filename)
      {
          fileNames.push(filename);
          i++;
          gm(__dirname+'/../../client/public/uploads/' + filename)
          .resize(200, 200)
          .gravity("Center")
          .quality(75)
          .noProfile()
          .write(__dirname+'/../../client/public/uploads/thumbnails/' + filename, function (err) {
              if (err) console.log(err);
              i--;
              if(i==0){

                 let movie = new Movie({
                   title:req.body.title,
                   genre:req.body.genre,
                   actors:req.body.actors,
                   directors:req.body.directors,
                   release:req.body.release,
                   description:req.body.description,
                   files:fileNames
                 });

                 movie.save(function(err){
                   if(err) return console.error(err);
                   res.end("done");
                 })

              };
          });
      }

   });

}
