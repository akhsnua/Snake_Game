 
 function init(){
    canvas = document.getElementById("mycanvas");
    W = H =canvas.width = canvas.height = 700;
    pen = canvas.getContext('2d');
    cs= 30;
    food = getRandomFood();
    game_over=false;

    // create image of apple
    food_img = new Image();
    food_img.scr="HTML/apple1.png";

    // score
    score=4;
    trophy = new Image();
    trophy.scr="HTML/score.jpg";

    snake = {
        init_len : 4,
        color : "blue",
        cells :[],
        direction : "right",

        createSnake: function (){
            for(var i = this.init_len ; i>0 ; i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake : function(){
            for(var i =0 ; i<this.cells.length ; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs , this.cells[i].y*cs , cs-2 , cs-2);
            }
        },

        updateSnake : function(){
            // update snake according to the direction property of snake
            // check if the snake has eaten food , increase the lenght of the array(snake).
            // generate new food object as well.
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            // check if snake can eat the food
            if(headX==food.x && headY==food.y){
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            var nextX,nextY;

            // changing pos of snake
            if (this.direction == "right"){
                nextX = headX+1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX-1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY+1;
            }
            else{
                nextX = headX;
                nextY = headY-1;
            }
            this.cells.unshift({x:nextX,y:nextY});

            // termination condition

            var last_X=Math.round(W/cs);
            var last_Y=Math.round(H/cs);

            if(this.cells[0].y<0 || this.cells[0].x<0 ||this.cells[0].x> last_X ||  this.cells[0].y>last_Y){
                game_over=true;
            }
        }
    };
    snake.createSnake();
    // Add a Event Listener on the document object

    function keyPressed(e){
        //conditional statements
        if(e.key=="ArrowRight"){
            snake.direction = "right";
            console.log("right");
        }
        else if(e.key=="ArrowLeft"){
            snake.direction = "left";
            console.log("left");
        }
        else if(e.key=="ArrowDown"){
            snake.direction = "down";
            console.log("down");
        }
        else if(e.key=="ArrowUp"){
            snake.direction = "up";
            console.log("up");
        }
        else{
            console.log("WRONG KEY");
        }


    }

    document.addEventListener("keydown",keyPressed );
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x*cs, food.y*cs, cs ,cs);

    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle = "blue";
    pen.font = "15px Roboto";
    pen.fillText("Score",20,20);
    pen.fillText(score,40,40);
 }
 function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round((Math.random()*(W-cs))/cs);
    var foodY = Math.round((Math.random()*(H-cs))/cs);

    var food ={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

 function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
 }

 init();

var f=setInterval(gameloop,100);