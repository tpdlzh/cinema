import React,{Component} from 'react';
import Header from './Header';
import ListComponent from './ListComponent';

class App extends Component{

   renderChild(){
      if(!this.props.children) return (<ListComponent/>);
      else return this.props.children;
   }

   render(){
 
     return(
           <div className="container">
             <Header/>
             {this.renderChild()}
           </div>
     );
   }
}

export default App;
