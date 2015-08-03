var React = window.React = require('react/addons');
var mediator = require('../lib/mediator');
var _ = require('underscore');

module.exports = React.createClass({

  getDefaultProps: function(){
    return {
      rows: 45,
      columns: 60,
      width: 800,
      height: 600
    };
  },


  componentDidMount: function(){
    this.canRender = true;
    this.tick();
  },

  draw: function(){
    var players = this.props.players;
    var user = this.props.user;
    var foodManager = this.props.foodManager;
    var self = this;

    this.ctx = this.getDOMNode().getContext('2d');

    this.clearCanvas();
    this.drawGrid();

    if (players){
      self.drawSnake(user.getBody(), user);

      players.forEach(function(player){
        var body = player.getBody();
        self.drawSnake(body, player);
      });

      _.each(foodManager.food, function(food){
        self.drawFood(food);
      });
    }
  },

  clearCanvas: function(){
    var ctx = this.getDOMNode().getContext('2d');
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,this.props.width,this.props.height);
  },

  drawGrid: function(){
    var ctx = this.getDOMNode().getContext('2d');


    if (this.gridImg){
      return ctx.putImageData(this.gridImg,0,0);
    }

    var rows = this.props.rows;
    var columns = this.props.columns;
    
    var width = this.getSquareWidth();
    var height = this.getSquareHeight();

    var xPos = 0;
    var yPos = 0;
    
    ctx.strokeStyle = "#ACF0F2";

    for( var row = 0; row < rows; row++ ){
      for( var col = 0; col < columns; col++){
        xPos = col * width;
        yPos = row * height;
        ctx.rect(xPos,yPos,width,height);
        
      }
    }

    ctx.stroke();

    this.gridImg = ctx.getImageData(0,0, this.props.width, this.props.height);

  },

  getSquareWidth: function(){
    return this.sqWidth || (this.sqWidth = (this.props.width / this.props.columns));
  },

  getSquareHeight: function(){
    return this.sqHeight || (this.sqHeight = (this.props.height / this.props.rows));
  },

  drawFood: function(food){
    var x = food.x;
    var y = food.y;
    var width = this.getSquareWidth();
    var height = this.getSquareHeight();

    var ctx = this.getDOMNode().getContext('2d');
    var color = food.color;
    ctx.fillStyle = color;  

    ctx.fillRect(x * width,y * height,width,height);
  },

  drawSnake: function(body, player){
    var width = this.getSquareWidth();
    var height = this.getSquareHeight();
    var ctx = this.getDOMNode().getContext('2d');

    var color = player.getColor();

    ctx.fillStyle = color;

    body.forEach(function(segment){
      ctx.fillRect(segment[0] * width,segment[1] * height,width,height);
    });
    
    ctx.stroke();
  },

  tick: function() {
    if (this.canRender) {
      this.draw();
      requestAnimationFrame(this.tick);
    }
  },

  componentWillUnmount: function(){
    this.canRender = false;
  },


  render: function(){
    return (
      <canvas width={this.props.width} height={this.props.height} className="board-game"></canvas>
    )
  }
  
}); 