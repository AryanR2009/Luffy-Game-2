var splashScreen;
var play_btn, info_btn;
var bg_img;
var playerImg, player;
var bigHands, player2;
var enemy1, enemy2, enemy3, enemy4, enemy5;
var enemyGroup1, enemyGroup2;
var enemylvl1;
var health = 200
var maxHealth = 200;
var score = 0;
var gameState= "wait"

function preload(){
    splashScreen=loadImage("assets/splashScreen.gif")
    bg_img=loadImage("assets/bgImage.png")
    enemy1 = loadImage("assets/draculeMihawk.png")
    enemy2 = loadImage("assets/doFlamingo.png")
    enemy3 = loadImage("assets/charlotteKatakuri.png")
    enemy4 = loadImage("assets/geckoMoria.png")
    enemy5 = loadImage("assets/kaidouDragon.png")
    playerImg = loadImage("assets/luffy.gif")
    bigHands = loadImage("assets/bigHands-unscreen.gif")
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    play_btn = createImg("assets/play.png");
    play_btn.position(windowWidth/2,windowHeight/2);
    play_btn.size(200,80);
    play_btn.hide();

    info_btn = createImg("assets/info.png");
    info_btn.position(windowWidth/3,windowHeight/2);
    info_btn.size(200,80);
    info_btn.hide();

   
    player = createSprite(windowWidth/15,windowHeight-150);
    player.addImage(playerImg);
    player.scale = 1
    player.visible = false;
    
    player2 = createSprite(windowWidth/15,windowHeight-150);
    player2.addImage(bigHands);
    player2.scale = 1
    player2.visible = false;

    enemyGroup1 = new Group()
    enemyGroup2 = new Group()

    

}
function draw(){
    if(gameState=="wait"){
        background(splashScreen);
        play_btn.show()
        info_btn.show()
        score = 0;
        health = 200;
        player.visible = false;
    }
   
    play_btn.mousePressed(() => {
        play_btn.hide()
        info_btn.hide()
        gameState="level1"
    })
    info_btn.mousePressed(()=>{
        play_btn.hide()
        info_btn.hide()
        gameState="info"
    })

    if(gameState=="info"){
        aboutGame();
    }
    

    if(gameState=="level1"){
        background(bg_img);
        player.visible = true;
        playerMovement();
        healthLevel();
        spawnEnemies1();

        if(keyDown("space")){
            player.addImage(bigHands)
        } 
       
      /*  for(var i = 0; i< enemyGroup1.length; i++){
               
            if(player2.isTouching(enemyGroup1.get(i))){
                    
                score += 10;
                enemyGroup1.get(i).remove();
            }
        }  */
        for(var i = 0; i< enemyGroup1.length; i++){
                console.log("checking")
                if(player.isTouching(enemyGroup1.get(i))){
                    console.log("if condition")
                health -= 50;
                enemyGroup1.get(i).remove();
            }   
        }

        if(score == 10){
            gameState = "levelwin"
        }
        if (health==0){
            gameState="gamelost"
        } 


    }

    if(gameState == "level2"){
        background(bg_img);
        player.visible = true;
        healthLevel();
        spawnEnemies2();
         /* for(var i = 0; i< enemyGroup2.length; i++){
               
            if(player2.isTouching(enemyGroup2.get(i))){
                    
                score += 10;
                enemyGroup2.get(i).remove();
            }
        }  */
        for(var i = 0; i< enemyGroup2.length; i++){
         
            if(player.isTouching(enemyGroup2.get(i))){
               
            health -= 10;
            enemyGroup2.get(i).remove();
        }   
    }

    if(score == 10){
        gameState = "gamewin"
    }
    if (health==0){
        gameState="gamelost"
    } 
    }
    if(gameState == "gamewin"){
        gameWin();
    }
    if(gameState == "levelwin"){
        levelWin();
    }
    if(gameState == "gamelost"){
        gameLost();
    }

    drawSprites();
    if(gameState == "level1"|| gameState == "level2"){
        fill("red");
        textSize(30)
        text("SCORE : "+score, windowWidth-200, windowHeight/12)
    }
}
function aboutGame(){
   swal({
     title: "About Game",
     text: "Use the arrows keys to move around, and defeat as many enemies as you possible. Have Fun & Good Luck!",
     imageUrl: "assets/splashScreen.gif",
     imageSize: "200x200",
     confirmButtonText: "Back To Main Screen",
     confirmButtonColor: "Green"

   },
   function(){
    gameState = "wait"
  }
   ) 
}

function spawnEnemies1(){
 
    enemylvl1 = createSprite(windowWidth+200,windowHeight-150)
    var random = Math.round(Math.random()*1+1); // 0 - 1, 1 - 2, 0.5 - 1.5 - 2 , 0.2 - 1.2 - 1
// 1,2 // A,B case A: case B /// Rohit, Aryan case Rohit: case Aryan
// / - division  % - reminder 50%2 (0) 51%2 (1)
    if(frameCount % 200 == 0){ 
        //checking if remainder is equal to zero - divisible by 100
    switch(random){
        case 1:
            enemylvl1.addImage(enemy1);
            enemylvl1.scale = 0.3;
            enemylvl1.velocityX = -10
            break;
        case 2:
            enemylvl1.addImage(enemy2);
            enemylvl1.scale = 0.3;
            enemylvl1.velocityX = -10
            break;
        default:
            break;
    }
    enemyGroup1.add(enemylvl1)
    }
}

function healthLevel(){
    stroke("darkgreen");
    strokeWeight(5);
    noFill()
    rect(windowWidth/12, windowHeight/12, maxHealth, 20);

    noStroke();
    fill('#22FD4E');
    rect(windowWidth/12, windowHeight/12, health, 20);
}

function spawnEnemies2(){
    console.log("spawnEnemies2")
    enemylvl2 = createSprite(windowWidth+200,windowHeight-150)
    var random = Math.round(Math.random()*2+1); 

    if(frameCount % 200 == 0){ 
       
    switch(random){
        case 1:
            enemylvl2.addImage(enemy3);
            enemylvl2.scale = 0.3;
            enemylvl2.velocityX = -10
            break;
        case 2:
            enemylvl2.addImage(enemy4);
            enemylvl2.scale = 0.3;
            enemylvl2.velocityX = -10
            break;
        case 3:
            enemylvl2.addImage(enemy5);
            enemylvl2.scale = 0.3;
            enemylvl2.velocityX = -10
            break;
        default:
            break;
    }
    enemyGroup2.add(enemylvl2)
    }
}

function levelWin(){
    swal({
        title: "Level1 Win",
        text: "Congratulations!! You win. Click on the Continue button to keep playing!",
        imageUrl: "assets/splashScreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Proceed to Level2",
        confirmButtonColor: "Blue"
   
      },
      function(){
       score = 0;
       health = 200;
       gameState = "level2"
       
     }
      ) 
}

function gameWin(){
    swal({
        title: "Game Win",
        text: "Congratulations!! You win. Click on the Restart button to play again!",
        imageUrl: "assets/splashScreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Restart",
        confirmButtonColor: "Green"
   
      },
      function(){
       gameState = "wait"
     }
      ) 
}

function gameLost(){
    swal({
        title: "Game Lost",
        text: "Good Try, but you died. Click the restart button to return to the main menu.",
        imageUrl: "assets/splashScreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Retry",
        confirmButtonColor: "Red"
   
      },
      function(){
       gameState = "wait"
     }
      )
}

function playerMovement(){
    if(player.x <= 30){
        player.x = 30;
    }
    if(player.x >= windowWidth-20){
        player.x = windowWidth-20
    }
    if(player.y <= 30){
        player.y = 30;
    }
    if(player.y >= windowHeight-110){
        player.y = windowHeight-110
    }
   
   
    if(keyDown("UP_ARROW")){
        player.y -=5;
    
    }
    player.y +=2;
    if(keyDown("LEFT_ARROW")){
        player.x -=5;
    }
    if(keyDown("RIGHT_ARROW")){
        player.x +=5;
    }
    
}

