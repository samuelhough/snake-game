var React = require('react/addons');
var mediator = require('../lib/mediator');

module.exports = React.createClass({
  
  getInitialState: function(){
    return {
      points: 0,
      highscore: 0
    }
  },

  componentDidMount: function(){
    mediator.on( 'user:point', this.onUserPoint, this );
    mediator.on( 'user:dead', this.onUserDeath, this);
  },

  componentWillUnmount: function(){
    mediator.off( 'user:point', this.onUserPoint, this);
    mediator.off( 'user:dead', this.onUserDeath, this);
  },

  onUserDeath: function(){
    var highscore = this.state.highscore;
    this.setState({
      points: 0,
      highscore: highscore
    })
  },

  onUserPoint: function(){
    var points = this.state.points, highscore = this.state.highscore;
    
    points++;

    if (points > this.state.highscore){
      highscore = points;
    }

    this.setState({
      points: points,
      highscore: highscore
    });
  },

  render: function(){
    return (
      <nav className="navbar">
        <h1>
        High Score: {this.state.highscore}
        </h1>
        <h3>
        Score: {this.state.points}
        </h3>
      </nav>
    )
  }
}); 