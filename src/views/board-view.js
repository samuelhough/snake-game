var React = window.React = require('react/addons');
var mediator = require('../lib/mediator');
var CanvasV = require('./canvas-view');
var PlayerE = require('../entities/player');
var _ = require('underscore');
var FoodManager = require('../entities/food-manager');
var randomPos = require('../lib/randomPos');

module.exports = React.createClass({

  getInitialState: function(){
    var foodManager = this.createFoodManager();

    return {
      players: [],
      user: this.createPlayer(foodManager),
      foodManager: foodManager
    }
  },

  componentDidMount: function(){
    mediator.on( 'user:dead', this.onUserDeath, this );
  },

  componentWillUnmount: function(){
    mediator.off( 'user:dead', this.onUserDeath, this );
  },

  onUserDeath: function(){
    this.state.foodManager.destroy(); // Destroy old food manager

    var foodManager = this.createFoodManager();


    this.setState({
      players: [],
      user: this.createPlayer(foodManager),
      foodManager: foodManager
    })
  },

  createPlayer: function(foodManager){
    return new PlayerE({
        direction: 'd',
        id: '1234',
        body: [randomPos(this.props.boardStats, true)],
        isUser: true,
        boardStats: this.props.boardStats,
        foodManager: foodManager
    });
  },

  createFoodManager: function(){
    return new FoodManager({
      boardStats: this.props.boardStats
    });
  },

  render: function(){
    return (
      <div className="game-container">
        <CanvasV players={this.state.players} user={this.state.user} foodManager={this.state.foodManager}></CanvasV>
      </div>
    )
  }
  
}); 