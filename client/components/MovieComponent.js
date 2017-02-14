import React,{Component} from 'react';

class MovieComponent extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {title,directors,rating,release,description,poster,genre,actors} = this.props.movie;

    return(
      <div className="col-md-6 movieCardContainer">
        <div className="card horizontal">
          <div className="card-image">
            <img src={'/uploads/poster/'+poster} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h6>{title}</h6>
              <p className="title">{genre.replace(/,/g,' | ')}</p>
              <p className="description">{description}</p>
              <div className="text-block">
                 <h5>Director:</h5>
                 <span>{directors}</span>
              </div>
              <div className="text-block">
                 <h5>Stars:</h5>
                 <span>{actors}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieComponent;
