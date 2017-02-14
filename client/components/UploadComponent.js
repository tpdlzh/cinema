import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DropFileComponent from './DropFileComponent';
import {connect} from 'react-redux';
import {updateFormField,doSubmit} from '../actions/MovieUploadAction';
import { bindActionCreators } from 'redux';
import {Loader} from './Loader';

class UploadComponent extends Component{

   constructor(){
     super();
     this.state = {
       loading:false
     }
   }

   updateFormData(fieldName,e){
      this.props.updateFormField(e.target ? e.target.value : e ,fieldName);
   }

   doSubmit(e){
     e.preventDefault();
     this.setState({loading:true});
     this.props.doSubmit(this.props._formData);
   }

   renderLoader(){
       if(this.state.loading && !this.props.formSubmitted) return(<Loader/>);

       if(Materialize && Materialize.updateTextFields){
         setTimeout(function(){
             Materialize.updateTextFields();
         })
       }

       return(
       <button className="btn waves-effect waves-light" onClick={this.doSubmit.bind(this)} type="submit" name="action">Upload
         <i className="material-icons right"></i>
       </button>
     );
   }

   render(){

      const {title,genre,actors,directors,release,description} = this.props._formData;

     return (
       <div className="row">
         <div className="col-md-6">
           <div className="input-field col s12">
             <input id="title" value={title} onChange={this.updateFormData.bind(this,'title')} type="text"/>
             <label htmlFor="title">Movie title</label>
           </div>
           <div className="input-field col s12">
             <input id="genre" type="text" value={genre} onChange={this.updateFormData.bind(this,'genre')} />
             <label htmlFor="genre">Genre</label>
           </div>
           <div className="input-field col s12">
             <input id="actors" type="text" value={actors} onChange={this.updateFormData.bind(this,'actors')} />
             <label htmlFor="actors">Actors</label>
           </div>
           <div className="input-field col s12">
             <input id="director" type="text" value={directors} onChange={this.updateFormData.bind(this,'directors')} />
             <label htmlFor="director">Director</label>
           </div>
           <div className="input-field col s12">
           <DatePicker
                   selected={release}
                   onChange={this.updateFormData.bind(this,'release')} />
           </div>
           <div className="input-field col s12">
             <textarea id="description" value={description} onChange={this.updateFormData.bind(this,'description')} className="materialize-textarea"></textarea>
             <label htmlFor="description">Description</label>
           </div>
           <div className="input-field col s12">
              <div>
                <DropFileComponent/>
              </div>
           </div>

           <div className="input-field col s12">

             {this.renderLoader()}
           </div>

         </div>
       </div>
     );
   }

}

 const stateToProps = (state) => {
    return {
      _formData:{
                  title:state.uploadReducer.title,
                  genre:state.uploadReducer.genre,
                  actors:state.uploadReducer.actors,
                  directors:state.uploadReducer.directors,
                  release:state.uploadReducer.release,
                  description:state.uploadReducer.description,
                  poster:state.uploadReducer.poster,
                  files:state.uploadReducer.files},
    formSubmitted:state.formSubmitted
    }
 }

 const dispatchAction = (dispatch) => {
   return bindActionCreators({updateFormField,doSubmit},dispatch);
 }

export default connect(stateToProps,dispatchAction)(UploadComponent);
