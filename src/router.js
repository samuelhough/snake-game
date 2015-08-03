var React  = require('react');
var Router = require('react-router');
var Route  = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

var AppV      = require('./views/app-view')
var NotFoundV = require('./views/notfound-view')
 
var routes = (
  <Route path="/" handler={AppV} >
    <Route path="*" handler={NotFoundV}/>
  </Route>
);


exports = {
  init: function(){
    Router.run(routes, Router.HistoryLocation, function (Handler) {
      React.render(<Handler/>, document.body);
    });
  }
}

module.exports = exports