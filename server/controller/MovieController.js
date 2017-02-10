'use strict';
const gm = require('gm');
const Movie = require("mongoose").model("Movie");

/**
 * Store Movie details
 *
 * @param {req}
 * @param {res}
 */

exports.uploadMovie = function(req,res){

   let i = 0;
   let fileNames = [];
   req.files.forEach(function(imageValues, key) {
      var filename = imageValues.filename;
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
               files:fileNames.join(",")
             });

             movie.save(function(err){
               if(err) return console.error(err);
               res.end("done");
             })

          };
      });
   });
 
}
