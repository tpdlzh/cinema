import React,{Component} from 'react';
import {findGetParameter} from './lib';
import axios from 'axios';
import moment from 'moment';

class CommentBox extends Component{

   constructor(){
     super();
     this.state = {
       id:null,
       comment:"",
       comments:[]
     }
   }

   componentWillReceiveProps(){
      let id = findGetParameter('id');
      let self = this;
      if(this.state.id != id){
        this.setState({id:id,comment:"",comments:[]});
        // If current state id and url id different, fetch comments by the id
        let comments = axios.get('/getComments?id='+id);
        comments.then((data)=>{
           self.setState({
             comments:data.data
           })
        })

      }


   }

   updateComment(e){
      this.setState({comment:e.target.value});
   }

   saveComment(){
     if(this.state.comment!=""){
       let promise = axios.post('/saveComment',{id:this.state.id,comment:this.state.comment});
       let self = this;
       let comments = this.state.comments;
       promise.then((data)=>{
         comments.push(data.data);
         self.setState({
           comments
         })
       })
     }
   }

   renderComments(){

     let comments = this.state.comments.map((comment,index)=>{
        return <div key={index}>
                <div className="commentContainer col s12">
                 <img className="col s1" src={"/images/profile_m.png"} />
                  <div className="row">
                   <div className="col s8">
                      <p className="date">{moment(comment.date).format("MMM Do YY")}</p>
                      <p className="comment">{comment.comment}</p>
                   </div>

                   <div className="btn_wrapper col-md-2">
                     <button className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons left">thumb_up</i></button>
                   </div>
                  </div>
                 </div>
               </div>
     })

     return comments;


   }

   render(){
     return(

    <div className="commentBoxContainer">
      <div className="row"><p className="bold">One line review</p></div>
      <div className="row commentFormContainer">
       <div className="col s12">
        <img className="col s1" src={"/images/profile_m.png"} />
        <div className="formContainer">
         <div className="row">
          <div className="textarea col s8">
           <div className="input-field col s12">
            <label htmlFor="comment">Enter your comment</label>
            <input value={this.state.comment} onChange={this.updateComment.bind(this)}  id="comment" type="text"/>
           </div>
          </div>

          <div className="btn_wrapper col-md-2">
            <button onClick={this.saveComment.bind(this)} className="waves-effect waves-light btn"><i className="material-icons left">mode_edit</i>Send</button>
          </div>

         </div>
        </div>
        </div>
      </div>

      <div className="row">
         {this.renderComments()}
      </div>
    </div>

     );
   }
}

export default CommentBox;
