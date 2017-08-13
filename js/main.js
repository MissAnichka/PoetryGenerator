
function generatePoem() {
  //accessing user input from website text box:
  var text =  document.getElementById("textinput").value;
  text = text.toLowerCase();
  // var abc = 'abcdefghijklmnopqrstuvwxyz'
  var punctuation = '\',.?!#';

  //clean-up the text entered:
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
  
  // creating the object containing each unique word as a key and all of the words that ever follow it in the entered text as part of its value array:
  function generateWordPairs(arr){
    var obj = {};
    for(var i = 0; i < arr.length-1; i++){
      var words = arr[i];
      var nextWord = arr[i+1];
      if(obj.hasOwnProperty(words)) obj[words].push(nextWord);
      else obj[words] = [nextWord];
    } return obj;
  }
  var wordPairs = generateWordPairs(arr);
  
  function random(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // randomly generate the length of the poem
  var numLines = random(2,8);
  var numWords = random(2,8);
  
  // randomly choose the next word in the poem based on the previous word just used:
  function randomValue(obj,key){
    if(obj[key]) var arr = obj[key];
     // if last word used is not a key as it didn't have any words following it, then go ahead and randomly choose a new word as the next word:
    else {
      var keysArr = Object.keys(obj);
      var n = random(0,keysArr.length-1);
      return keysArr[n];
    }
    n = random(0,arr.length-1);
    return arr[n];
  }

  // generating a line
  function writeLine(obj,numWords){
    var lineOfPoetry = [];
    var keysArr = Object.keys(obj);
    var n = random(0,keysArr.length);
    var randomKey = keysArr[n];
    while(lineOfPoetry.length <= numWords){
       // choosing a random first word to start each new line with:
      if (!lineOfPoetry.length){
        var value = randomValue(wordPairs, randomKey);
        lineOfPoetry.push(randomKey, value);
      // choosing the next words to follow the first word in that line: 
      } else { 
        var nextKey = lineOfPoetry[lineOfPoetry.length-1];
        lineOfPoetry.push(randomValue(obj, nextKey));
      }
    }
    return [lineOfPoetry.join(' ')];
  }

  // creating random amount of lines for full poem, each line starting with a new random word
  var finalPoem = [];
  var count = 0;
  while(count <= numLines){
    count++;
    finalPoem.push(writeLine(wordPairs,numWords));
  }
  var poem = finalPoem.join('<br>');
  return document.getElementById("display").innerHTML = poem;
}

function stripTags(){
  let poem = $('#display').html();
  console.log(typeof(poem));
  let newPoem = poem.replace(/<br>/g,'  ');
  console.log(newPoem);
  return newPoem;
}

// function speakPoem(){
//   var say = document.getElementById("display").value;
//   return document.getElementsByName("onclick").innerHTML = say;
// }


// Meow