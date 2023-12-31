let score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    loss:0,
    ties:0
};

scoreUpdate();
/*
if(!score){
    score={
        wins:0,
        loss:0,
        ties:0
    };
};*/
let isAutoPlaying=false;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        intervalId=setInterval(()=>{
        const playerMove=pickComputerMove();
        playGame(playerMove);
    },1000);
    isAutoPlaying=true;
    document.querySelector('.js-autoplay-button').innerHTML='Stop Playing';
    }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    document.querySelector('.js-autoplay-button').innerHTML='Auto Play';
    }
}
document.querySelector('.js-autoplay-button').addEventListener('click',()=>{
    autoPlay();
})
document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('Paper');
})

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('Scissors');
})

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('Rock');
    }else if(event.key==='p'){
        playGame('Paper');
    }else if(event.key==='s'){
        playGame('Scissors');
    }else if(event.key==='a'){
        autoPlay();
    }else if(event.key==='Backspace'){
        showResetConfirmation();
    }
});
document.querySelector('.js-reset-button').addEventListener('click',()=>{
    showResetConfirmation();
});

function showResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML=`Are you sure you want to reset the score?<button class="js-reset-confirm-yes reset-confirm-button">Yes</button>
    <button class="js-reset-confirm-no reset-confirm-button">No</button>`;
    document.querySelector('.js-reset-confirm-yes').addEventListener('click',()=>{
        resetScore();
        hideResetConfirmation();
    });
    document.querySelector('.js-reset-confirm-no').addEventListener('click',()=>{
        hideResetConfirmation();
    });
}

function resetScore(){
    score.ties=0;score.loss=0;score.wins=0;
    localStorage.removeItem('score');
    scoreUpdate();
}
function hideResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML='';
}
function playGame(userMove){
    const computerMove=pickComputerMove();
    let result='';
    if(computerMove===userMove){
        result='Tie.'
    }else if(computerMove==='Scissors' && userMove==='Rock' ||   computerMove==='Paper' && userMove==='Scissors'|| computerMove==='Rock' && userMove==='Paper'){
        result='You Win.'
    }else {
        result='You Lose.'
    }

    if(result==='You Win.'){
        score.wins++;
    }else if(result==='You Lose.'){
        score.loss++;
    }else if(result==='Tie.'){
        score.ties++;
    }
    localStorage.setItem('score',JSON.stringify(score));

    document.querySelector('.js-result').innerHTML=result;

    document.querySelector('.js-moves').innerHTML=`You<img src="${userMove}-emoji.png" class="move-icon">
<img src="${computerMove}-emoji.png" class="move-icon">Computer`;

    scoreUpdate();
//             alert(`You Picked ${userMove}.Computer picked ${computerMove}.${result}
// Wins:${score.wins} Loss:${score.loss} Ties:${score.ties}`);
    
}

function pickComputerMove(){
    let randomNumber=Math.random();
    let computerMove='';
    if(randomNumber>=0 && randomNumber<1/3){
        computerMove='Rock';
    }else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove='Paper';
    }else if(randomNumber>=2/3 && randomNumber<1){
        computerMove='Scissors';
    }
    return computerMove;
}

function scoreUpdate(){
    document.querySelector('.js-score').innerHTML=`Wins:${score.wins} Loss:${score.loss} Ties:${score.ties}`;
}