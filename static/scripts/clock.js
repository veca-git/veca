//inicialización de valor enviado desde python

let segundos = document.getElementById('id_clock').src.match(/\w+=\w+/g);
segundos = segundos[0].split('=');
segundos = segundos[1];

//circle start

let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
  timePercent = 1800;
	var offset = - length - length * value / (timePercent);
	progressBar.style.strokeDashoffset = offset; 
	pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
};

//circle ends
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');

let intervalTimer;
let timeLeft;
let wholeTime = segundos; // manage this to set the whole time 
let isPaused = false;
let isStarted = false;


update(wholeTime,wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);

function changeWholeTime(seconds){
  if ((wholeTime + seconds) > 0){
    wholeTime += seconds;
    update(wholeTime,wholeTime);
  }
}

// for (var i = 0; i < setterBtns.length; i++) {
//     setterBtns[i].addEventListener("click", function(event) {
//         var param = this.dataset.setter;
//         switch (param) {
//             case 'minutes-plus':
//                 changeWholeTime(1 * 60);
//                 break;
//             case 'minutes-minus':
//                 changeWholeTime(-1 * 60);
//                 break;
//             case 'seconds-plus':
//                 changeWholeTime(1);
//                 break;
//             case 'seconds-minus':
//                 changeWholeTime(-1);
//                 break;
//         }
//       displayTimeLeft(wholeTime);
//     });
// }

function timer (seconds){ //counts time, takes seconds
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);
  
  intervalTimer = setInterval(function(){
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if(timeLeft < 0){

      // alert('se acabo');
      
      // clearInterval(intervalTimer);
      isStarted = false;
      // setterBtns.forEach(function(btn){
      //   btn.disabled = dalse;
      //   btn.style.opacity = 1;
      // });
      // displayTimeLeft(wholeTime);
      // pauseBtn.classList.remove('pause');
      // pauseBtn.classList.add('play');
      return ;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}
function pauseTimer(event){
  if(isStarted === false){
    timer(wholeTime);
    isStarted = true;
    // this.classList.remove('play');
    // this.classList.add('pause');
    // setterBtns.forEach(function(btn){
    //   btn.disabled = true;
    //   btn.style.opacity = 0.5;
    // });

  }else if(isPaused){
    this.classList.remove('play');
    this.classList.add('pause');
    timer(timeLeft);
    isPaused = isPaused ? false : true
  }else{
    this.classList.remove('pause');
    this.classList.add('play');
    clearInterval(intervalTimer);
    isPaused = isPaused ? false : true ;
  }
}

function displayTimeLeft (timeLeft){ //displays time on the input

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}

  window.addEventListener("load", pauseTimer);

// pauseBtn.addEventListener('click',pauseTimer);