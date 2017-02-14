import React,{Component} from 'react';
import {connect} from 'react-redux';
import {findGetParameter} from './lib';

var Star = React.createClass({
	render: function() {
	    var r = 'fa fa-star';
    	if(!this.props.selected){
          r += '-o';
        }
        return (
        	<i {...this.props} style={{fontSize:20,color:"#26a69a"}} className={r}/>
        );
    }
});

var Rating = React.createClass({
	getInitialState: function(){
    	return {
				rating: this.props.readOnly ? (this.props.default ? this.props.default : 0) : 0,
				hoverAt: null,
				id:findGetParameter('id')
			};
    },

		componentWillReceiveProps:function(){
				let self = this;
			 if(this.props.readOnly){
			 this.props.movie.lists.forEach((movie)=>{
				  let id = findGetParameter('id');
					if(movie._id === id){
						self.setState({
							rating:movie.rating
						});
					return;
					}
			 });
		 } else {
			  if(this.state.id !== findGetParameter('id')){
					self.setState({
						rating:0,
						id:findGetParameter('id')
					});
				}
		 }


		},

    handleMouseOver: function(idx, evt){
    	this.state.hoverAt = idx + 1;
        this.forceUpdate();
    },
    handleMouseOut: function(idx, evt){
    	this.state.hoverAt = null;
        this.forceUpdate();
    },
    handleClick: function(idx, evt){
        this.state.rating = idx + 1;
        this.forceUpdate();
				this.props.onClick && this.props.onClick(this.state.rating);
    },
	render: function(){
    	var stars = [];
        for(var i = 0 ; i < 5; i++){
        	var rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;
        	var selected = (i < rating);
        	stars.push(
            <Star key={i} selected={selected}
            	  onMouseOver={!this.props.readOnly ? this.handleMouseOver.bind(this, i) : null}
                onMouseOut={this.handleMouseOut.bind(this, i)}
                onClick={!this.props.readOnly ? this.handleClick.bind(this, i) : null}
            />);
        }
    	return (<div style={this.props.style}>{stars}</div>);
    }
});

const stateToProps = (state) => {
  return {movie:state.movie};
}

export default connect(stateToProps)(Rating);
