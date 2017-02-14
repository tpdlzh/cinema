import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchMovieList} from '../actions/MovieActions';
import MovieCard from './MovieComponent';

class ListComponent extends Component{

  componentWillMount(){
    if(this.props.movie.lists.length==0){
      this.props.fetchMovieList();
    }
  }

  renderMovieList(){
    let list = this.props.movie.lists && this.props.movie.lists.map(function(movie,index){
      return <Link key={index} to={"/?id="+movie._id}><MovieCard movie={movie}/></Link>
    })

    return list;
  }

  render(){
    return (

      <div>
        {this.renderMovieList()}
      </div>

    );
  }

}

const stateToProps = (state) => {
  return {movie:state.movie};
}

const actionToDispatch = (dispatch) => {
  return bindActionCreators({fetchMovieList},dispatch);
}

export default connect(stateToProps,actionToDispatch)(ListComponent);
