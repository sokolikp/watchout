// start slingin' some d3 here.

//initialize svg gameBoard
var gameBoardDimensions = 500;
var numEnemies = 10;
var enemyRadius = 10;
var enemiesCollection = d3.range(numEnemies);

var drag = d3.behavior.drag()
  .on("drag", function() {
              d3.select(this).attr({'cx': d3.event.x,
                      'cy': d3.event.y});
  });

var enemyMove = function() {
  // if (counter===10) {
  //   return false;
  // }
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
  // counter++;
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
    'class': 'bad-guys'})

var playerSVG = d3.select('.gameBoard')
  .append('svg')
  .attr({'class': 'playerSVG'})

var player = playerSVG.selectAll('circle')
  .data([0])
  .enter()
  .append('circle')
  .attr({
    'cx' : gameBoardDimensions/2,
    'cy': gameBoardDimensions/2,
    'r': 30,
    'fill': 'white',
    'class': 'good-guy'
  })
  .call(drag);


enemyMove();
