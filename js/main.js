
// input

 
// function generatePoem(txt) {
  
//   var text = document.getElementById("textinput").value; 
//   return document.getElementById("display").innerHTML = text;
// }

  
// }
// generatePoem();
// document.getElementById("display").innerHTML = 'bye';

// var text =  document.getElementById("textinput").value;
// var text = "When I'm with you, all I get is wild thoughts Wild, wild, wild Wild, wild, wild thoughts Wild, wild, wild When I'm with you, all I get is wild thoughts Wild, wild, wild When I'm with you, all I get is wild thoughts DJ Khaled! Wild, wild, wild Wild, wild, wild When I'm with you, all I get is wild thoughts"


function generatePoem(text, numLines, numWords) {
text =  document.getElementById("textinput").value;
// var text = "When I'm with you, all I get is wild thoughts Wild, wild, wild Wild, wild, wild thoughts Wild, wild, wild When I'm with you, all I get is wild thoughts Wild, wild, wild When I'm with you, all I get is wild thoughts DJ Khaled! Wild, wild, wild Wild, wild, wild When I'm with you, all I get is wild thoughts"
text = text.toLowerCase();
// var abc = 'abcdefghijklmnopqrstuvwxyz'
var punctuation = '\',.?!#';
numLines = 10;
numWords = 10;

function parseText(str) {
  var clean = '';
  for(var i = 0; i < str.length; i++){
    if(typeof str[i] === 'string'){
      if(punctuation.indexOf(str[i]) === -1){
        clean += str[i];
      }
    }
  } return clean.split(' ');
}

var arr = parseText(text);

var wordPairs = generateWordPairs(arr);

function generateWordPairs(arr){
  var obj = {};
  for(var i = 0; i < arr.length-1; i++){
    var words = arr[i];
    var nextWord = arr[i+1];
    if(obj.hasOwnProperty(words)) obj[words].push(nextWord);
    else obj[words] = [nextWord];
  } return obj;
}

function random(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomValue(obj,key){
  if(obj[key]) var arr = obj[key];
  else {
    var keysArr = Object.keys(obj);
    var n = random(0,keysArr.length-1);
    return keysArr[n];
  }
  n = random(0,arr.length-1);
  return arr[n];
}

function writeLine(obj,numWords){
  var lineOfPoetry = [];
  var keysArr = Object.keys(obj);
  var n = random(0,keysArr.length);
  var randomKey = keysArr[n];
    while(lineOfPoetry.length !== numWords){
      if (!lineOfPoetry.length){
        var value = randomValue(wordPairs, randomKey);
        lineOfPoetry.push(randomKey, value);
      } else { 
        var nextKey = lineOfPoetry[-1];
        lineOfPoetry.push(randomValue(obj, nextKey));
      }
    }
  return [lineOfPoetry.join(' ')];
}


var finalPoem = [];
var count = 0;
while(count <= numLines){
  count++;
  finalPoem.push(writeLine(wordPairs,numWords));
}
var poem = finalPoem.join('<br>');
return document.getElementById("display").innerHTML = poem;
}

// generatePoem(text,10,10);
// document.getElementById("display").innerHTML = ; 
