import {combineReducers} from 'redux';
import MovieUploadReducer from './MovieUploadReducer';
import MovieDataSubmitReducer from './MovieDataSubmitReducer';
import MovieReducer from './MovieReducer';

export default combineReducers({

   uploadReducer:MovieUploadReducer,
   formSubmitted:MovieDataSubmitReducer,
   movie:MovieReducer

});
