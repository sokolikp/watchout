// start slingin' some d3 here.

//initialize svg gameBoard
var gameBoardDimensions = 500;
var numEnemies = 10;
var enemyRadius = 10;
var enemiesCollection = d3.range(numEnemies);
var playerRadius = 20;
var currX, currY;
var collisionCount = 0;

var detectCollision = function(selection, currX, currY) {
  console.log('we in collions and have selection: ' + selection)
  selection.each(function() {
    console.log('we in inner function and this is: ' + d3.select(this).attr('cx'));
      var enemyX = Math.floor(d3.select(this).attr('cx'));
      var enemyY = Math.floor(d3.select(this).attr('cy'));
      if ((Math.abs(enemyX - currX) < (playerRadius + enemyRadius)) && (Math.abs(enemyY - currY) < (playerRadius + enemyRadius))) {
        collisionCount++;
        console.log(collisionCount);
      }
    })
};

// var tweenWithCollisionDetection = function(endData) {
//   var endPos, enemy, startPos;
//   enemy = d3.select(this);
//   startPos = {
//     x: parseFloat(enemy.attr('cx')),
//     y: parseFloat(enemy.attr('cy'))
//   };
//   endPos = {
//     x: axes.x(endData.x),
//     y: axes.y(endData.y)
//   };
//   return function(t) {
//     var enemyNextPos;
//     checkCollision(enemy, onCollision);
//     enemyNextPos = {
//       x: startPos.x + (endPos.x - startPos.x) * t,
//       y: startPos.y + (endPos.y - startPos.y) * t
//     };
//     return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
//   };
// };

var drag = d3.behavior.drag()
  .on("drag", function() {
    //x-boundary control
    currX = d3.event.x
    currY = d3.event.y
    if (!(d3.event.x < playerRadius || d3.event.x > (gameBoardDimensions - playerRadius))) {
      d3.select(this).attr({
        'cx': currX});
    }
    //y-boundary control
    if (!(d3.event.y < playerRadius || d3.event.y > (gameBoardDimensions - playerRadius))) {
      d3.select(this).attr({
        'cy': currY});
    }
    //collision control
    detectCollision(badGuys, currX, currY);
});

var enemyMove = function() {
  enemies.selectAll('.bad-guys')
    .transition().duration(1000)
    .attr({'cx': function() {
        return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
      },
      'cy': function() {
        return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
      }
    })
  d3.timer(enemyMove, 1000);
  return true;
};

var interpTimer = function(selection) {
  console.log(selection);
  selection.each(function(){
    console.log('hi');
   // return [d3.select(this).attr('cx'),d3.select(this).attr('cy')];
   console.log('player: ' + player);
   detectCollision(player, d3.select(this).attr('cx'), d3.select(this).attr('cy'));
  })
  d3.timer(interpTimer(selection), 10);
  return true;
};

var gameBoard = d3.select('body')
  .append('svg')
  .attr({'width': gameBoardDimensions,
         'height': gameBoardDimensions,
         'class': 'gameBoard'});

//add background fill to container
gameBoard.append('rect')
  .attr({'width': '100%',
   'height': '100%',
   'fill': 'black'});

//initialize enemies
var enemies = d3.select('.gameBoard')
  .append('svg')
  .attr({'class': 'enemies'});

enemies.selectAll('circle').data(enemiesCollection)
  .enter()
  .append('circle')
  .attr({'cx': function() {
      return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
    },
    'cy': function() {
      return (enemyRadius + 10) + Math.random() * (gameBoardDimensions - (2 * (enemyRadius + 10)));
    },
    'r': enemyRadius,
    'fill': 'red',
    'class': 'bad-guys'});

var badGuys = enemies.selectAll('.bad-guys');

var player = d3.select('.gameBoard')
  .append('svg')
  .attr({'class': 'player'});

player.selectAll('circle').data([0])
  .enter()
  .append('circle')
  .attr({
    'cx' : gameBoardDimensions/2,
    'cy': gameBoardDimensions/2,
    'r': playerRadius,
    'fill': 'white',
    'class': 'good-guy'
  })
  .call(drag);

// var touch = d3.event.touch(enemies);

enemyMove();
interpTimer(badGuys);
