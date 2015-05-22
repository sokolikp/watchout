// start slingin' some d3 here.

//initialize svg gameboard
var gameBoard = d3.select('body')
                  .append('svg')
                  .attr({'width': 500,
                         'height': 500,
                         'class': 'gameBoard'});

//add background fill to container
gameBoard.append('rect').attr({'width': '100%',
                               'height': '100%',
                               'fill': 'black'});

//initialize enemies
var enemies = d3.select('.gameBoard')
                .append('svg')
                .attr({'width': 20,
                       'height': 20
                       'class': 'enemies'});

//add background fill to enenmies
enemies.append('rect').attr({'width': '100%',
                             'height': '100%',
                             'fill': 'red'});


