var assert = require("assert");
var randomWord1 = "dog";
var guess = "dog";


function convertSeconds(s) {
    var minutes = Math.floor(s / 60);
    var seconds = s % 60;
    return seconds
}

var check1 = convertSeconds(25 - 25);
var check2 = convertSeconds(25 - 0);
var check3 = convertSeconds(25 - 10);

assert.strictEqual(check1, 0);
assert.strictEqual(check2, 25);
assert.strictEqual(check3, 15);



