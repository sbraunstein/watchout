var gameOptions = {
	height: 450,
	width: 700,
	nEnemies: 30,
	padding: 20
};

var gameStats = {
	score: 0,
	bestScore: 0,
};
var svgContainer = d3.select("body").append("svg").attr("width",gameOptions.width).attr("height",gameOptions.height);


var Enemy = function(id){
	this.x = Math.random() * gameOptions.width
	this.id = id;
	this.radius = 10;
	this.y = Math.random() * gameOptions.height;
	this.color = "red"

}
var createEnemies = function(){
	var enemies = [];
	for(var i = 0; i < gameOptions.nEnemies; i++){
		enemies.push(new Enemy(i))
	}
	return enemies;
}

var enemydata = createEnemies();
var addEnemies = svgContainer.selectAll("circle")
 	.data(enemydata)// append array
 	.enter()
 	.append("circle")
 	.attr("cx", function (d) {return d.x})
 	.attr("cy", function (d){return d.y})
	.attr("r", function (d){return d.radius})
	.attr("fill", function (d){return d.color})

setInterval(function(){
	addEnemies.transition()
		.duration(900)
		.attr("cx", function(d){return Math.random() * gameOptions.width})
		.attr("cy", function(d){return Math.random() * gameOptions.height})
	}, 1000);

var player = function(y) {
	this.y = 0 || y;
	this.x = gameOptions.width;
	this.radius = 20;
	this.color= "green";
	this.name = "steve"
}

var drag = d3.behavior.drag()  
             .on('dragstart', function() { addPlayer.style('fill', 'black'); })
             .on('drag', function() { addPlayer.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { addPlayer.style('fill', 'green'); });

var steve = new player;

var addPlayer = svgContainer.selectAll("draggableCircle")
	.data([steve])
	.enter()
	.append("circle")
	.attr("cx", function (d){return d.x})
	.attr("cy", function (d){return d.y})
	.attr("r", function (d){return d.radius})
	.attr("fill", function (d){return d.color})
	.call(drag)

// var score = 0;
// var bestScore = 0;
// var scoreTicker = function(){
//   score = score+1;
//   bestScore = Math.max(score, bestScore);
//   d3.select(".scoreboard .high span").text(bestScore);
//   d3.select(".scoreboard .current span").text(score);
// };
// setInterval(scoreTicker, 250);



// var prevCollision = false;
// var collisionCount = 0;
// //collision detected
// var detectCollision = function(){
//   var collision = false;

//   circles.each( function(){
//     var enemy = d3.select(this);
//     var a = player.attr("cx") - createEnemies.attr("cx");
//     var b = player.attr("cy") - createEnemies.attr("cy");
//     var c = Math.sqrt(a*a + b*b);
//     if( c < 20){
//       collision = true;
//     }
//   });

//   if(collision){
//     if(prevCollision !== collision){
//       collisionCount = collisionCount+1;
//       d3.select(".scoreboard .collisions span").text(collisionCount);
//       score = 0;
//     }
//   }

//   prevCollision = collision;

// };
// d3.timer(detectCollision);







