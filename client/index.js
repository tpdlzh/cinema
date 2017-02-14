import React,{Component} from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducer from './reducers';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import UploadComponent from './components/UploadComponent';
import MovieDetailComponent from './components/MovieDetailComponent';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <Router history={browserHistory}>
     <Route path='/' component={App}>
       <Route path="/upload" component={UploadComponent}/>
     </Route>
    <Route path=":id" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('container')
)
