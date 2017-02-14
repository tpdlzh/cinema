import {fetchList,UpdateRating} from '../actionTypes';
import axios from 'axios';

export const fetchMovieList = () => {
   const request = axios.get('/getList');

   return {
     type:fetchList,
     payload:request
   }
}

export const updateRating = (rating,id) => {

  axios.post('/updateRating',{
     id:id,
     rating:rating
  })

  return {
    type:UpdateRating,
    payload:{id,rating}
  }
}
