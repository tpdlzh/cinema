import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {updateFormField} from '../actions/MovieUploadAction';

class DropFileComponent extends Component{

  onDrop(files) {
    this.props.updateFormField(files,"files");
  }

  selectPoster(filename,e){
    this.props.updateFormField(filename,"poster");
  }

  displayPreview(){
     let items = this.props._formData.map((file,index)=>{
       let className = this.props.poster == file.name ? "thumbnail pull-left clickable posterSelected" : "thumbnail pull-left clickable";
       return <li key={index}>
                <img onClick={this.selectPoster.bind(this,file.name)} className={className} src={file.preview} />
              </li>;
     })  
     return (<ul>{items}</ul>);
  }

  render(){

    return (
        <div>
          <Dropzone
            activeStyle={{ borderStyle: 'solid', backgroundColor: '#eee' }}
            className="dropZoneContainer" onDrop={this.onDrop.bind(this)}>
            <div>Drop Movie Images here</div>
          </Dropzone>
          <div>
            {this.displayPreview()}
          </div>
        </div>
    );
  }

}

const stateToProps = (state) =>{
  return {_formData:state.uploadReducer.files,poster:state.uploadReducer.poster};
}

const actionToDispatch = (dispatch) => {
  return bindActionCreators({updateFormField},dispatch);
}

export default connect(stateToProps,actionToDispatch)(DropFileComponent);
