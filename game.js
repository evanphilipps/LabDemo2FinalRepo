var counter = 0;
var timeleft = 25;
var tenSecondsLeft;
var timesup;
var randomWord;
var ding;
var buzz;
var word;
var i = 0;
var list = [];
function preload() {
    tenSecondsLeft = loadSound("sounds/countdownSound.mp3");
    timesup = loadSound("sounds/airhorn.mp3");
    ding = loadSound("sounds/ding.mp3");
    buzz = loadSound("sounds/buzz.mp3");
}
function setup() {
    w = 1400;
    h = 750;
    createCanvas(w, h);
    strokeWeight(10);
    rect(0, 0, w, h);
    frameRate(60);
    var words = ['cheese', 'bone', 'socks', 'leaf', 'whale', 'pie', 'shirt', 'orange', 'lollipop', 'bed', 'mouth', 'person', 'horse', 'snake', 'jar', 'spoon', 'lamp', 'kite', 'monkey', 'swing', 'cloud', 'snowman', 'baby', 'eyes', 'pen', 'giraffe', 'grapes', 'book', 'ocean', 'star', 'cupcake', 'cow', 'lips', 'worm', 'sun', 'basketball', 'hat', 'bus', 'chair', 'purse', 'head', 'spider','shoe', 'ghost', 'coat', 'chicken', 'heart', 'jellyfish', 'tree', 'seashell', 'duck', 'bracelet', 'grass', 'jacket', 'slide', 'doll', 'spider', 'clock', 'cup', 'bridge', 'apple', 'balloon', 'drum', 'ears', 'egg', 'bread', 'nose', 'house', 'beach', 'airplane', 'inchworm', 'hippo', 'light', 'turtle', 'ball', 'carrot', 'cherry', 'ice', 'pencil', 'circle', 'bed', 'ant', 'girl', 'glasses', 'flower', 'mouse', 'banana', 'alligator', 'bell', 'robot', 'smile', 'bike', 'rocket', 'dinosaur', 'dog', 'bunny', 'cookie', 'bowl', 'apple', 'door', 'horse', 'door', 'song', 'trip', 'backbone', 'bomb', 'round', 'treasure', 'garbage', 'park', 'whistle', 'palace', 'baseball', 'coal', 'queen', 'dominoes', 'photograph', 'computer', 'hockey', 'aircraft', 'pepper', 'key', 'ipad', 'whisk', 'cake', 'circus', 'battery', 'mailman', 'cowboy', 'password', 'bicycle', 'skate', 'electricity', 'lightsaber', 'nature', 'shallow', 'toast', 'outside', 'America', 'roller', 'blading', 'gingerbread', 'man', 'bowtie', 'light', 'bulb', 'platypus', 'music', 'sailboat', 'popsicle', 'knee', 'pineapple', 'tusk', 'sprinkler','money', 'spool', 'lighthouse', 'doormat', 'face', 'flute', 'owl', 'gate', 'suitcase', 'bathroom', 'scale', 'peach', 'newspaper', 'watering', 'can', 'hook', 'school', 'beaver', 'camera', 'hair', 'dryer', 'mushroom', 'quilt', 'chalk', 'dollar', 'soda', 'chin', 'swing', 'garden','ticket', 'boot', 'cello', 'rain', 'clam', 'pelican', 'stingray', 'nail', 'sheep', 'stoplight', 'coconut', 'crib', 'hippopotamus', 'ring', 'video', 'camera', 'snowflake'];
    randomWord = words[getRandomInt(0, words.length-1)].toString();
    var timer = select("#timer");
    word = select('#randomWord');
    timer.html(convertSeconds(timeleft - counter));
    word.html(randomWord);
    var interval = setInterval(timeIt, 1000);
    function timeIt() {
        counter++;
        timer.html(convertSeconds(timeleft - counter));
        if(counter == timeleft) {
            timesup.play();
            clearInterval(interval);
            counter = 0;
        }
        if(counter >= timeleft-10 && counter < timeleft) {
            tenSecondsLeft.play();
            timer.style("color", "#FF0000");
            setTimeout(function(){timer.style("color", "#FFFFFF")}, 500)
        }
    }
    strokeWeight(5);
}

function draw() {
    if (mouseIsPressed && counter !== 0) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function convertSeconds(s) {
    var minutes = floor(s / 60);
    var seconds = s % 60;
    return nf(minutes,2)+":"+nf(seconds,2);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function takeGuess(){
    var guess = document.getElementById("guess").value;
    var actual = randomWord;
    print(guess);
    print(actual);
    if(guess == actual) {
        document.getElementById("guess").style.backgroundColor = "#00FF00";
        ding.play()
    }
    else {
        document.getElementById("guess").style.backgroundColor = "#FF0000";
        buzz.play();
        setTimeout(function(){document.getElementById("guess").style.backgroundColor = "#FFFFFF"}, 1000);
    }
}

function clearBoard(){
    clear();
    strokeWeight(10);
    fill(255);
    stroke(0);
    rect(0, 0, w, h);

}

function changeColor(color) {
    strokeWeight(5);
    stroke(color)
}

function User(){
    this.name = "";
    this.score = 0;
    this.guess = "";
    this.artist = false;
    this.id = 1;
    if(this.artist === true){
        draw();
        word.html(randomWord);
    } else {
        word.html("Guess!");
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

function reset(){
    for(var x in list){
        list[x].artist = false;
    }
}

