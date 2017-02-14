'use strict';
const path = require('path');
const MovieController = require('../controller/MovieController');
const CommentController = require('../controller/CommentController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let poster = req.body.poster;
    let name = file.originalname;
    if(poster == name){
      cb(null,__dirname+'/../../client/public/uploads/poster/')
    }else {
      cb(null,__dirname+'/../../client/public/uploads/')
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })
/**
 * Route
 *
 * @param {Object} express instance
 */


module.exports = function(app){

  app.get('/getList',MovieController.getMovieList);



  app.post('/updateRating',MovieController.updateRating);

  app.post('/uploadMovie',upload.any(),MovieController.uploadMovie);

  app.get('/getComments',CommentController.getComments);
  app.post('/saveComment',CommentController.saveComment);

  app.get('*',function(req,res){
     res.sendFile(path.join(__dirname+"/../../client/public/index.html"));
  });

}
