var counter;
var timeleft = 15;
var pressed = false;
var tenSecondsLeft;
var timesup;
var randomWord;
var ding;
var buzz;
var i = 0;
var list = [];
var timer;
var interval;
var word;
var points;
var colorNow;
var assert;
var words = ['cheese', 'bone', 'socks', 'leaf', 'whale', 'pie', 'shirt', 'orange', 'lollipop', 'bed', 'mouth', 'person', 'horse', 'snake', 'jar', 'spoon', 'lamp', 'kite', 'monkey', 'swing', 'cloud', 'snowman', 'baby', 'eyes', 'pen', 'giraffe', 'grapes', 'book', 'ocean', 'star', 'cupcake', 'cow', 'lips', 'worm', 'sun', 'basketball', 'hat', 'bus', 'chair', 'purse', 'head', 'spider','shoe', 'ghost', 'coat', 'chicken', 'heart', 'jellyfish', 'tree', 'seashell', 'duck', 'bracelet', 'grass', 'jacket', 'slide', 'doll', 'spider', 'clock', 'cup', 'bridge', 'apple', 'balloon', 'drum', 'ears', 'egg', 'bread', 'nose', 'house', 'beach', 'airplane', 'inchworm', 'hippo', 'light', 'turtle', 'ball', 'carrot', 'cherry', 'ice', 'pencil', 'circle', 'bed', 'ant', 'girl', 'glasses', 'flower', 'mouse', 'banana', 'alligator', 'bell', 'robot', 'smile', 'bike', 'rocket', 'dinosaur', 'dog', 'bunny', 'cookie', 'bowl', 'apple', 'door', 'horse', 'door', 'song', 'trip', 'backbone', 'bomb', 'round', 'treasure', 'garbage', 'park', 'whistle', 'palace', 'baseball', 'coal', 'queen', 'dominoes', 'photograph', 'computer', 'hockey', 'aircraft', 'pepper', 'key', 'ipad', 'whisk', 'cake', 'circus', 'battery', 'mailman', 'cowboy', 'password', 'bicycle', 'skate', 'electricity', 'lightsaber', 'nature', 'shallow', 'toast', 'outside', 'America', 'roller', 'blading', 'gingerbread', 'man', 'bowtie', 'light', 'bulb', 'platypus', 'music', 'sailboat', 'popsicle', 'knee', 'pineapple', 'tusk', 'sprinkler','money', 'spool', 'lighthouse', 'doormat', 'face', 'flute', 'owl', 'gate', 'suitcase', 'bathroom', 'scale', 'peach', 'newspaper', 'watering', 'can', 'hook', 'school', 'beaver', 'camera', 'hair', 'dryer', 'mushroom', 'quilt', 'chalk', 'dollar', 'soda', 'chin', 'swing', 'garden','ticket', 'boot', 'cello', 'rain', 'clam', 'pelican', 'stingray', 'nail', 'sheep', 'stoplight', 'coconut', 'crib', 'hippopotamus', 'ring', 'video', 'camera', 'snowflake'];
var currentPoints = 0;
var guessedCorrect = false;
function preload() {
    tenSecondsLeft = loadSound("sounds/countdownSound.mp3");
    timesup = loadSound("sounds/airhorn.mp3");
    ding = loadSound("sounds/ding.mp3");
    buzz = loadSound("sounds/buzz.mp3");
    masterVolume(.5);
}
function setup() {
    w = 1400;
    h = 750;
    counter = 0;
    createCanvas(w, h);
    noStroke();
    rect(0, 0, w, h);
    stroke(0);
    strokeWeight(5);
    frameRate(60);
    var timer = select("#timer");
    var word = select('#randomWord');
    timer.html(convertSeconds(timeleft - counter));
    word.html(getRandomWord());
    interval = setInterval(timeIt, 1000);
    function timeIt() {
        counter++;
        timer.html(convertSeconds(timeleft - counter));
        print(((document.getElementById("guess").value === randomWord) && (pressed === true)));
        if((counter >= timeleft) || guessedCorrect){
            timer.style("color", "#FF0000");
            setTimeout(function(){timer.style("color", "#FFFFFF")}, 4000);
            timesup.play();
            clearInterval(interval);
            counter = timeleft;
            setTimeout(function(){reset();interval = setInterval(timeIt, 1000);guessedCorrect = false;}, 3000);
            document.getElementById("guess").value = ""
        }
        if(counter >= timeleft-10 && counter < timeleft) {
            tenSecondsLeft.play();
            timer.style("color", "#FF0000");
            setTimeout(function(){timer.style("color", "#FFFFFF")}, 500)
        }

    }
    colorNow = select("#colorSelected");
}

function draw() {
    if (mouseIsPressed && counter !== timeleft) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function convertSeconds(s) {
    var minutes = floor(s / 60);
    var seconds = s % 60;
    return nf(minutes,2)+":"+nf(seconds,2);
}

function getRandomWord(){
    randomWord = words[getRandomInt(0, words.length-1)].toString();
    return randomWord
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function takeGuess(){
    points = select("#score");
    points.html(currentPoints);
    if(document.getElementById("guess").value === randomWord) {
        document.getElementById("guess").style.backgroundColor = "#00FF00";
        document.getElementById("guess").value ="";
        ding.play();
        currentPoints += 10;
        points.html(currentPoints);
        guessedCorrect = true;
    }
    else {
        document.getElementById("guess").style.backgroundColor = "#FF0000";
        document.getElementById("guess").value = "";
        buzz.play();
        setTimeout(function(){document.getElementById("guess").style.backgroundColor = "#FFFFFF"}, 1000);
    }
    }


function clearBoard(){
    clear();
    noStroke();
    fill(255);
    rect(0, 0, w, h);
    stroke(0);
    strokeWeight(5);
    colorNow.html('black');
}

function changeColor(color, size) {
    colorNow.html(color);
    stroke(color);
    strokeWeight(size);
}

function User(){
    this.name = "";
    this.score = 0;
    this.guess = "";
    this.artist = false;
    this.id = 1;
    if(this.artist === true){
        draw();
    }
}

function drawer(){
    if (i >= list.length){ // is i > 3?
        i = 0;
    }
    var currentPlayer = list[i];
    currentPlayer.artist = true;
    i++
}

function isPressed() {
    pressed = true;
}
function reset(){
    clearBoard();
    counter = -1;
    word = select('#randomWord');
    word.html(getRandomWord());
    for(var x in list){
        list[x].artist = false;
    }
}