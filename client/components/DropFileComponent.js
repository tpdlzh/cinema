import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {updateFormField} from '../actions/MovieUploadAction';

class DropFileComponent extends Component{

  onDrop(files) {
    this.props.updateFormField(files,"files");
  }

  displayPreview(){
     let items = this.props._formData.map((file,index)=>{
       return <li key={index}>
                <img className="thumbnail pull-left" src={file.preview} />
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
  return {_formData:state.uploadReducer.files};
}

const actionToDispatch = (dispatch) => {
  return bindActionCreators({updateFormField},dispatch);
}

export default connect(stateToProps,actionToDispatch)(DropFileComponent);
