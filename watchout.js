// start slingin' some d3 here.

//initialize svg gameBoard
var gameBoardDimensions = 1000;
var numEnemies = 10;
var enemyRadius = 30;
var enemiesCollection = d3.range(numEnemies);
var playerRadius = 40;
var currX, currY;
var collisionCount = 0;
var playerScore = 0;
var highScore = 0;
// var checker;
      // <div class="high">High score: <span>0</span></div>

var updateScore = function() {
  collisionCount++;
  if(playerScore > highScore) {
    highScore = playerScore;
  }
  d3.select('.high').select('span').text(Math.floor(highScore/10));
  d3.select('.collisions').select('span').text(collisionCount);
  playerScore = 0;

};

var detectCollision = function(enemy, currX, currY) {
  var enemyX = enemy.attr('x');
  var enemyY = enemy.attr('y');
  if (checkCollision(enemy) && enemy.attr('checker') === 'false') {
    enemy.attr('checker', true);
    // collisionCount++
    //console.log(collisionCount);
    updateScore();
  }
  else if(!checkCollision(enemy)  && enemy.attr('checker') === 'true') {
    enemy.attr('checker', false);
  }
};

var checkCollision = function(enemy) {
    var playerObj = d3.select('.good-guy');
    var radiusSum, separation, xDiff, yDiff;
    radiusSum = parseFloat(enemy.attr('r')) + parseFloat(playerObj.attr('r'));
    xDiff = parseFloat(enemy.attr('x')) - parseFloat(playerObj.attr('x'));
    yDiff = parseFloat(enemy.attr('y')) - parseFloat(playerObj.attr('y'));
    separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < radiusSum) {
      return true;
    }
    else {
      return false;
    }
};

var tweenWithCollisionDetection = function(endData) {
  var endPos, enemy, startPos;
  enemy = d3.select(this);
  startPos = {
    x: parseFloat(enemy.attr('x')),
    y: parseFloat(enemy.attr('y'))
  };
  endPos = {
    x: (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10))),
    y: (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)))
  };
  return function(t) {
    var enemyNextPos;
    enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x) * t,
      y: startPos.y + (endPos.y - startPos.y) * t
    };
    detectCollision(enemy, playerSelection.attr('x'), playerSelection.attr('y'));
    playerScore++;
    d3.select('.current').select('span').text(Math.floor(playerScore/10));
    return enemy.attr('x', enemyNextPos.x).attr('y', enemyNextPos.y);
  };
};

var drag = d3.behavior.drag()
  .on("drag", function() {
    //x-boundary control
    currX = d3.event.x
    currY = d3.event.y
    if (!(d3.event.x < playerRadius/2 || d3.event.x > (gameBoardDimensions - playerRadius/2))) {
      d3.select(this).attr({
        'x': currX - playerRadius/2});
    }
    //y-boundary control
    if (!(d3.event.y < playerRadius/2 || d3.event.y > (gameBoardDimensions - playerRadius/2))) {
      d3.select(this).attr({
        'y': currY - playerRadius/2});
    }
    //collision control
    //detectCollision(badGuys, currX, currY);
});

var enemyMove = function() {
  enemies.selectAll('.bad-guys')
    .transition().duration(1000)
    // .attr({'x': function() {
    //     return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
    //   },
    //   'y': function() {
    //     return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
    //   }
    // })
    // .transition().duration(2000)
    .tween('custom', tweenWithCollisionDetection);
  d3.timer(enemyMove, 1000);
  return true;
};

// var interpTimer = function(selection) {
//   console.log(selection);
//   selection.each(function(){
//     console.log('hi');
//    // return [d3.select(this).attr('x'),d3.select(this).attr('y')];
//    console.log('player: ' + player);
//    detectCollision(player, d3.select(this).attr('x'), d3.select(this).attr('y'));
//   })
//   d3.timer(interpTimer(selection), 10);
//   return true;
// };

var gameBoard = d3.select('body')
  .append('svg')
  .attr({'width': gameBoardDimensions,
         'height': gameBoardDimensions,
         'class': 'gameBoard'});

//add background fill to container
gameBoard.append('image')
  .attr({'width': '100%',
   'xlink:href': 'pizza-box.jpg',
   'height': '100%'});

//initialize enemies
var enemies = d3.select('.gameBoard')
  .append('svg')
  .attr({'class': 'enemies'});

enemies.selectAll('image').data(enemiesCollection)
  .enter()
  .append('image')
  .attr({'x': function() {
      return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
    },
    'y': function() {
      return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
    },
    'r': enemyRadius,
    'xlink:href': 'broccoli.png',
    'width': enemyRadius,
    'height': enemyRadius,
    'class': 'bad-guys',
    'checker': false});

var badGuys = enemies.selectAll('.bad-guys');

var player = d3.select('.gameBoard')
  .append('svg')
  .attr({'class': 'player'});
  //.append('image-svg');

player.selectAll('image').data([0])
  .enter()
  .append('image')
  .attr({
    'x' : gameBoardDimensions/2,
    'y': gameBoardDimensions/2,
    'r': playerRadius,
    'xlink:href': 'pizza.png',
    'width': playerRadius,
    'height': playerRadius,
    'class': 'good-guy'
  })
  .call(drag);

var playerSelection = player.select('.good-guy');

// var touch = d3.event.touch(enemies);

enemyMove();
// interpTimer(badGuys);
