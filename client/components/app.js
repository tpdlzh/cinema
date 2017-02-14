import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import ListComponent from './ListComponent';
import {findGetParameter} from './lib';
import LayerLoader from './LayerLoader';
import MovieDetailComponent from './MovieDetailComponent';
import $ from 'jquery';

class App extends Component{

   constructor(props){
     super(props);
     this.movieRendered = false;
     this.layer = new LayerLoader("newDivContainer");
   }


   renderChild(){
      if(!this.props.children) return (<ListComponent/>);
      else return this.props.children;
   }

   render(){

     if(findGetParameter("id")){
       if(!this.movieRendered){
         $("#movieDetailContainer").show();
         this.layer.show({
             type:"click",
             callback:"removeLayer",
             target:"movieDetailContainer",
             fn:function(){this.movieRendered = false}.bind(this)}
           ).attachLoader();
         this.movieRendered = true;
       }

     }else{
       this.movieRendered = false;
       this.layer.removeLayer('movieDetailContainer');
     }

     return(
           <div className="container">
             <Header/>
             {this.renderChild()}
                <MovieDetailComponent
                  closeCallback={()=>{
                       this.layer.removeLayer(
                      'movieDetailContainer',
                       function(){ this.movieRendered = false}.bind(this))}}
                  openCallback={()=>{this.layer.removeLoader()}}
                  />
           </div>
     );
   }
}

export default App;
