const path = require('path');
const MovieController = require('../controller/MovieController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname+'/../../client/public/uploads/')
  },
  filename: function (req, file, cb) {
    const f = file.originalname.split('.');
    cb(null, f[0] + '-' + Date.now()+"."+f[1]);
  }
})

const upload = multer({ storage: storage })
/**
 * Route
 *
 * @param {Object} express instance
 */


module.exports = function(app){

  app.get('*',function(req,res){
     res.sendFile(path.join(__dirname+"/../../client/public/index.html"));
  });

  app.post('/uploadMovie',upload.any(),MovieController.uploadMovie);


}
