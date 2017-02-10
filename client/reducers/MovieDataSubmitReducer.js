import {formSubmitted} from '../actionTypes';
export default (state = false,action) => {
    switch(action.type){
      case formSubmitted:
      return !!action.payload.data;

      default:return state;
    }
}
