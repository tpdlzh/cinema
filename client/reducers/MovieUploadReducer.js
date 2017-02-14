import {formUpdate} from '../actionTypes';
import {deepCopy} from './lib';
import moment from 'moment';

  let movieFormData = {
    files:[],
    title:"",
    genre:"",
    actors:"",
    directors:"",
    release:moment(),
    description:"",
    poster:""
  };

export default (state = movieFormData,action) => {
   switch(action.type){
     case formUpdate:
          return deepCopy(state,action.payload.fieldName,action.payload.formData)
    default: return movieFormData;
   }
}
