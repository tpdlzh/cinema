import {formUpdate,formSubmitted} from '../actionTypes';
import axios from 'axios';
import moment from 'moment';

export const updateFormField = (formData,fieldName) =>{
   return {
     type:formUpdate,
     payload:{formData,fieldName}
   }
}

export const doSubmit = (formData) => {

  let _formData_ = new FormData();
  _formData_.append("title",formData.title);
  _formData_.append("genre",formData.genre);
  _formData_.append("actors",formData.actors);
  _formData_.append("directors",formData.directors);
  _formData_.append("release",moment(formData.release).format());
  _formData_.append("description",formData.description);
  let i = 0;
  for(let file of formData.files){
    _formData_.append("files"+(i++),file);
  }

  const request = axios.post('/uploadMovie',_formData_,{headers: { 'content-type': 'multipart/form-data' }});

  return {
    type:formSubmitted,
    payload:request
  }
}
