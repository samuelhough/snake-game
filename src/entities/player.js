var mediator = require('../lib/mediator');
var keymaster = require('../lib/keymaster');
var _ = require('underscore')

var Player = function(options) {
  this.direction = options.direction;
  this.id = options.id;
  this.body = options.body;
  this.boardStats = options.boardStats;
  this.size = 2;
  this.foodManager = options.foodManager;
  console.log(this.body[0], this.body[1])
  if (options.isUser){
    this.setupUser();
    this.loop();
  }
};

Player.prototype.setupUser = function(){
  var self = this;
  keymaster('s', function(){
    self.setDirection('d');
  });
  keymaster('w', function(){
    self.setDirection('u');
  });
  keymaster('a', function(){
    self.setDirection('l');
  });
  keymaster('d', function(){
    self.setDirection('r');
  });
};

Player.prototype.isValidDirection = function(newDirection) {
  var currentDirection = this.direction;
  if (currentDirection === 'd'){
    return newDirection !== 'u';
  }
  if (currentDirection === 'u'){
    return newDirection !== 'd';
  }
  if (currentDirection === 'l'){
    return newDirection !== 'r';
  }
  if (currentDirection === 'r'){
    return newDirection !== 'l';
  }
}

Player.prototype.setDirection = function(direction){
  if (this.isValidDirection(direction)){
    this.direction = direction;
  }
};

Player.prototype.loop = function(){
  var self = this;
  this.intervalId = setInterval(function(){
    if( !self.dead ){
      if (self.body.length < self.size){
        self.grow();      
      }
      self.move(self.direction);

      self.detectFoodCollision();
      self.detectCollisionWithSelf();
    } 

  }, 40);
};

Player.prototype.detectFoodCollision = function(){
  var collided = this.foodManager.detectCollision(this.body[0]);
  if (collided){
    this.grow();
    mediator.emit('user:point')
  }
};

Player.prototype.detectCollisionWithSelf = function(){
  var head = this.body[0];
  var bodyPart;
  for(var cur = 2; cur < this.body.length; cur++){
    bodyPart = this.body[cur];
    if(bodyPart[0] === head[0] && bodyPart[1] === head[1]){
      this.kill();
      break;
    }
  }
}

Player.prototype.grow = function(){
  var end = this.body.length - 1;
  var endPos = this.body[end]
  this.body.push(endPos);
}

Player.prototype.getColor = function(){
  return "#000000";
};

Player.prototype.move = function(direction){
  var head = this.body[0];
  var headX = head[0];
  var headY = head[1];
  var newHead = [];

  switch (direction) {
    case 'u':
      newHead[0] = headX;
      newHead[1] = headY - 1;
      break;
    case 'r':
      newHead[0] = headX + 1; 
      newHead[1] = headY;
      break;
    case 'l':
      newHead[0] = headX - 1; 
      newHead[1] = headY;
      break;
    case 'd':
      newHead[0] = headX;
      newHead[1] = headY + 1;
      break;
  }

  // Went out of bounds
  if (newHead[0] > this.boardStats.columns || newHead[0] < 0){
    return this.kill();
  } else if(newHead[1] > this.boardStats.rows || newHead[1] < 0){
    return this.kill();
  }

  this.body.unshift(newHead);
  if (this.body.length > 2){
    this.body.pop();    
  }
};

Player.prototype.getBody = function(){
  return this.body;
};

Player.prototype.kill = function(){
  clearInterval(this.intervalId);
  var self = this;
  var chunk = Math.ceil(this.body.length / 20);
  if (chunk < 1){
    chunk = 1;
  }
  this.killInterval = setInterval(function(){
    if (self.body.length){
        self.body.splice(0, chunk);
    } else {
      clearInterval(self.killInterval);
      mediator.emit('user:dead');
    }
  }, 50);
};

module.exports = Player;