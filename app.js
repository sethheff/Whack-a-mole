// here I am creating globally scoped variables to store all of my elements from my HTML via the DOM.

const points = document.querySelector(".yourPoints");
const moleHills = document.querySelectorAll(".moleHill");
const moles = document.querySelectorAll(".mole"); 
const showTimeLeft = document.querySelector('#time-left')
    const startButton = document.querySelector('.start-button')
    let timeLeft = 30
 let timesUp = false;
 let yourPoints = 0;
 let lastMoleHill;  



// timer function
function countDown(){
    // The setInterval() evaluates an expression at specified intervals (in milliseconds).
    setInterval(function(){
        if(timeLeft <= 0) {
            // clearInterval() clears a timer and then sets the timeLeft equal to 0. This lets us know the game is over. 
            clearInterval(timeLeft = 0)
        }
        // showTimeLeft is calling on our hard-coded 30 ('id. of time-left) in our HTML and then subtracting 1 from it.
        showTimeLeft.innerHTML = timeLeft
        timeLeft -=1
        //its subtracting 1 from 30 every 1 second (1000 milliseconds)
    }, 1000)
}



// random time intervals for when the moles come out of their hills
function randomTime(min, max) {
     return (Math.random() * (max - min) + min);
 }

 // this function (randomMoleHill) is used to return a random DOM element. Specifically a random moleHill (which are divs in my HTML.There are 9 of them)
 function randomMoleHill(moleHills) {
     // Math.random() returns a random numer while Math.floor() returns the largest integer less than or equal to a given number... together they return a random integer between 0 and the length of the moleHills (9)
     const moleHillIndex = Math.floor(Math.random() * moleHills.length);
     // the variable hill is equal to moleHills index value (between 0 and 8)
     const hill = moleHills[moleHillIndex];
     // here we are saying that if moleHills is equal to (===) the hill selected (say we randomly return a hill with an index value of 3, and then that same div comes up again) we will run randomMoleHill again, in order to get a different div. This is done so that the same mole hill doesn't get chosen over and over, which would defeat the purpose of the game.
     if (moleHills === lastMoleHill) {
         // if they are the same, run randomMoleHill again
         return randomMoleHill(moleHills);
     }
     // lastMoleHill is a variable that is storing the last value of hill. Therefore lastMoleHill is equal to hill.
     lastMoleHill = hill;
     // 
     return hill;
 }

 // this function (show) is used to randomly 'show' a mole coming out of a mole hill. It calls on the previous function (randomMoleHill) 
 function show() {
     const time = randomTime(500, 1000); // .5 seconds and 1 second
     const hill = randomMoleHill(moleHills);
     hill.classList.add("pop"); // add class of pop (and all of it's properties) to anything with a class of hill. This will allow the moles to come out of their hills.
     setTimeout(() => { // setTimeout is the function used to get the moles to go away. if setTimeout wasnt there, they moles would just stay out of their hills.
         hill.classList.remove("pop"); // we remove the class of pop
         if (!timesUp) show(); // if time is not up then we will run show() again. If timesUp is true, we they will stop popping up
     }, time);
 }

 // the startGame() begins the game with...
 function startGame() {
     // 0 points
     points.textContent = 0;
     // time is not up because it has not started yet
     timeUp = false;
     // yourPoints are equal to 0 
     yourPoints = 0;
     // run the show() function
     show();
     // after 30,000 millisecond (30 seconds) set timesUp to true so that the game ends.
     countDown();
     
     setTimeout(() => (timesUp = true), 30000);
 }

 function whack(e) {
     if (!e.isTrusted) return; // 
     yourPoints++; // if you successfully whack-a-mole, it will add 1 to your points via ++
     this.classList.remove("pop"); // the mole will go back down by removing the class of pop 
     points.textContent = yourPoints; // we will set the points to reflect how many points you get by whacking-moles
 }


 // we are taking out moles and we are listening for an event on each of them. That event is 'click'. If the mole is clicked, the 'whack' function will run.
 moles.forEach(mole => mole.addEventListener("click", whack));



