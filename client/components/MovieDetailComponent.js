import React,{Component} from 'react';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {updateRating} from '../actions/MovieActions';
import {findGetParameter} from './lib';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import Rating from './StarRating';
import CommentBox from './CommentBox';

 class MovieDetailComponent extends Component{

   constructor(){
     super();
     this.state = {
       id:findGetParameter("id")
     }
   }

   componentDidMount(){
     this.props.openCallback();
     if(this.state.id) $("#movieDetailContainer").show();
   }

   closeContainer(){
      $("#movieDetailContainer").hide();
      this.props.closeCallback();
   }

   getSelectedMovie(){
      let id = findGetParameter("id");
      let selctedMovie = null;
      this.props.movie.lists && this.props.movie.lists.forEach((movie)=>{
        if(movie._id==id) selctedMovie = movie;
        return;
      })

      return selctedMovie;
   }

   updateRating(rating){
      this.props.updateRating(rating,findGetParameter("id"));
      this.forceUpdate();
   }

   renderMovie(){
     let movie = null;
     let rated = "";

     movie = this.getSelectedMovie();
      if(!!movie){
        const images = movie.files.map((file)=>{
           let obj = {};
           obj.original = "/uploads/"+file;
           obj.thumbnail = "/uploads/"+file;
           return obj;
        });

        if(movie.ratingCounter) rated = "(" + movie.ratingCounter + " rated)";

        return <div className="movie_details_container">
           <div className="row">
             <img className="pull-left" src={'/uploads/poster/'+movie.poster}/>
             <div className="title_wrapper pull-right">
                <div className="title"><h5>{movie.title}</h5></div>
                <div className="bookingWrapper"><button className="waves-effect waves-light btn"><i className="material-icons left">movie</i>Book</button></div>
             </div>

             <div className="details pull-left">
              <div className="director"><p><span className="bold">Director: </span>{movie.directors}</p></div>
              <div className="release"><p><span className="bold">Release: </span>{moment(movie.release).format("MMM Do YYYY")}</p></div>
              <div className="actors"><p><span className="bold">Actors: </span>{movie.actors}</p></div>
              <div className="genre"><p><span className="bold">Genre: </span>{movie.genre}</p></div>
              <div className="rate"><span className="bold">Rate: </span>
              <Rating style={{"display":"inline-block"}} default={movie.rating} readOnly={true}/>
                <span className="ratingCounter">{rated}</span>
              </div>
             </div>

             <div className="rating pull-left">
               <p className="bold">My Rate</p>
               <Rating onClick={this.updateRating.bind(this)}/>
             </div>

         </div>

           <div className="row plotContainer">
             <div className="plot">
               <h6 className="bold">Plot</h6>
               <div>{movie.description}</div>
             </div>
           </div>

           <div className="row imageContainer">
             <div>
               <h6 className="bold">Images</h6>
               <div>
                 <ImageGallery
                   items={images}
                   slideInterval={2000}
                   showFullscreenButton={false}
                   />
               </div>
             </div>
           </div>

           <div className="row"></div>
       </div>
    }
   }

   render(){
     let movie = this.getSelectedMovie();

     return(
       <div className="animated fadeInUp container" id="movieDetailContainer">
          <button type="button" onClick={this.closeContainer.bind(this)} id="closeBtn"></button>
          {  this.renderMovie() }
          <CommentBox/>
       </div>
     )
   }
 }

 const stateToProps = (state) => {
    return {movie:state.movie}
 }

 const dispatchToProps = (dispatch) => {
    return bindActionCreators({updateRating},dispatch);
 }

 export default connect(stateToProps,dispatchToProps)(MovieDetailComponent);
