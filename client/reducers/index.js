import {combineReducers} from 'redux';
import MovieUploadReducer from './MovieUploadReducer';
import MovieDataSubmitReducer from './MovieDataSubmitReducer';

export default combineReducers({

   uploadReducer:MovieUploadReducer,
   formSubmitted:MovieDataSubmitReducer

});
