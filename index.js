let inputDir={x:0,y:0};
const music=new Audio('music.mp3');
const foodmusic=new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
let speed=9;
let lastPaintTime=0;
let snakeArr=[
    {x:13 ,y:15}
];
food = {x: 6, y: 7};
let score =0;


function main(ctime){
   window.requestAnimationFrame(main);
   
   if ((ctime-lastPaintTime)/1000 < 1/speed ) {
    return ;
   }
   lastPaintTime=ctime;
   gameEngine();
}

function isCollide(snakeArr){
   for(let j=1;j<snakeArr.length-1;j++){
      if (snakeArr[0].x===snakeArr[j].x && snakeArr[0].y===snakeArr[j].y ){
         return true;
      }
   }
   if (snakeArr[0].x >18 || snakeArr[0].x <=0 || snakeArr[0].y >18 || snakeArr[0].y<=0 ){
      return true;
   }
   return false;
 }

function gameEngine(){
  
   if(isCollide(snakeArr)){
      gameOverSound.play();
      music.pause();
      inputDir =  {x: 0, y: 0}; 
      alert("Game Over. Press any key to play again!");
      score = 0;
      sb.innerHTML = "Score: " + score;
      snakeArr = [{x: 13, y: 15}];
      musicSound.play();
  }
   if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
      foodmusic.play();
      score++;
      sb.innerHTML = "Score: " + score;
      snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
      let a = 2;
      let b = 16;
      food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
  }
   //to move snake
   for(let i=snakeArr.length-2;i>=0;i--){
      snakeArr[i+1] = {...snakeArr[i]};
   }
   
   snakeArr[0].x +=inputDir.x;
   snakeArr[0].y +=inputDir.y;

   board.innerHTML="";
   snakeArr.forEach((e,index)=>{
    snakebox= document.createElement('div');
    snakebox.style.gridRowStart=e.y;
    snakebox.style.gridColumnStart=e.x;
    if (index===0){
      snakebox.classList.add('head');
    }
    else{
      snakebox.classList.add('snake');
    }
    board.appendChild(snakebox);
   });
   foodbox=document.createElement('div');
   foodbox.style.gridRowStart=food.y;
   foodbox.style.gridColumnStart=food.x;
   foodbox.classList.add('food');
   board.appendChild(foodbox);
   
}

window.requestAnimationFrame(main);
sb.innerHTML = "Score: " + score;
window.addEventListener('keydown',e =>{
   music.play();
   inputDir={x:0 ,y:-1};
   moveSound.play();
   switch(e.key){
      case "ArrowUp":
         
         inputDir.x = 0;
         inputDir.y = -1;
           break;
     
      case "ArrowDown":
            
            inputDir.x = 0;
            inputDir.y = 1;
            break;

      case "ArrowLeft":
          
            inputDir.x = -1;
            inputDir.y = 0;
            break;

      case "ArrowRight":
            
            inputDir.x = 1;
            inputDir.y = 0;
            break;
         
      default :
           break;
   }
});