import {fetchList,UpdateRating} from '../actionTypes';
import {deepCopy} from './lib';

let movie = {
  lists:[]
}


export default (state = movie,action) => {

  switch(action.type){
    case fetchList:
    return deepCopy(state,"lists",action.payload.data);

    case UpdateRating:
    let obj = Object.assign({},state);
    obj.lists.forEach((movie)=>{
       if(movie._id === action.payload.id){
         movie.ratingCounter++;
         movie.ratingTotal += action.payload.rating;
         movie.rating = Math.ceil(movie.ratingTotal/movie.ratingCounter);
       }
    });

    return state;

    default:return state;
  }

}
