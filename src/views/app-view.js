var React    = window.React = require('react/addons');
var mediator = require('../lib/mediator');
var HeaderV  = require('./header-view');
var BoardV   = require('./board-view');


module.exports = React.createClass({

  getDefaultProps: function(){
    return {
      boardStats: {
        rows: 45,
        columns: 60,
        width: 800,
        height: 600
      }
    };
  },
  
  getInitialState: function(){
    return {
      playing: false
    }
  },

  onUserDeath: function(){
    this.setState({
      playing: false
    });
  },

  componentDidMount: function(){
    mediator.on( 'user:dead', this.onUserDeath, this );
  },

  play: function(){
    this.setState({playing: true})
  },

  render: function(){

    if (!this.state.playing) {
      return (
        <div className="welcome-screen">
          < HeaderV playing={this.state.playing}></HeaderV>
          <button className="play-btn" onClick={this.play}>Play!</button>
        </div>
      )
    } else {
      return (
        <div>
          < HeaderV></HeaderV>
          < BoardV boardStats={this.props.boardStats}></BoardV>
        </div>
      )
    }
  }
  
}); 