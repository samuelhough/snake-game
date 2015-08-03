var mediator = require('../lib/mediator');
var _ = require('underscore')

var FoodManager = function(options) {
  this.food = options.food || {};
  this.boardStats = options.boardStats;
  this.totalFood = 0;

  var self = this;
  this.createFoodInterval = setInterval(function(){
    var row = Math.floor(Math.random() * self.boardStats.rows);
    var column = Math.floor(Math.random() * self.boardStats.columns);

    self.createFood({
      x: row,
      y: column,
      id: (Math.random() * 100000)
    });
  }, 2000);
}

FoodManager.prototype.createFood = function(options){
  if(this.totalFood < 4){
    this.totalFood++;
    var foodPiece = {
      x: options.x,
      y: options.y,
      id: options.id,
      color: "#25da43"
    };

    this.food[options.id] = foodPiece;
  }

};

FoodManager.prototype.detectCollision = function(coordinate){
  var didCollide = false;

  for(piece in this.food){
    if (this.food[piece].x === coordinate[0] && this.food[piece].y === coordinate[1]){
      didCollide = true;
      this.destroyFood(this.food[piece].id)
      break;
    }
  }

  return didCollide;
}


FoodManager.prototype.destroyFood = function(id){
  this.totalFood--;
  delete this.food[id];
};

FoodManager.prototype.destroy = function(){
  this.board = null;
  this.food = null;
  clearTimeout(this.createFoodInterval);
};


module.exports = FoodManager;