import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import RoomCreatorContainer from './containers/RoomCreatorContainer.jsx';
import SearchPage from './pages/SearchPage.jsx';
import HomePage from './pages/HomePage.jsx';

function routes() {
    return (
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="/map" component={SearchPage}/>
            <Route path="/room/create" component={RoomCreatorContainer}/>
          </Route>
        </Router>
    );
}
    
export default routes;