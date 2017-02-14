'use strict';
const Comment = require("mongoose").model("Comment");

exports.saveComment = function(req,res){
   const id = req.body.id,
         comment = req.body.comment

         let _comment = new Comment({
           movieId:id,
           comment:comment
         })

         _comment.save((err,doc)=>{
           if(err) console.error(err);
           res.json(doc);
         })

}

exports.getComments = function(req,res){
   const id = req.query.id;
   Comment.find({movieId:id})
   .sort({"date":"ascending"})
   .exec(function(err,data){
      res.json(data);
   })

}
