var express = require('express');
var path = require('path');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("SERVER RUNNING");

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);


function newConnection(socket){
    console.log(Object.keys(io.sockets.sockets));
    var username = "user" + randInt(0, 100000).toString();
    console.log("Username: "+username);
    //if user == drawer
    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        data.username = username;
        socket.broadcast.emit('mouse', data);

        console.log(data);
    }
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/artist.html'));
});

function guesser(socket){
    console.log("user is drawer")
}



function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}