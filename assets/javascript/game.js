
//__________________________________Hangman-Game: Marvel Edition___________________________________________
//Notes:
//Couldn't get whitespace to show as strring, so used hyphens as a substitute.
//To improve chooseWord(), need to identify what words have already been completed, so that no word is
//brought up twice or more. Therefore we need a set order or words, and a function to randomize the order.
//No time though, maybe later.
//________________________________________VARIABLES:_______________________________________________________


//Vars that track values:
var revealedLetters = [];
var completedWords = [];
var numRevealedLetters =0;
var wrongLetters = [];
var numWrongLetters = 0;
var lives = 7;
var numCompletedLetters = 0;
var numCompletedWords = 0;

//Display Variables:

//Our Words:

//Current words:
var currentHiddenWord;
var currentTrueWord;

//hidden words:
var h_Iron_Man = ["_", "_", "_", "_", "&nbsp;", "_", "_", "_"];
var h_Captain_America = ["_", "_", "_", "_", "_", "_", "_", "&nbsp;", "_", "_", "_", "_", "_", "_", "_"];
var h_Black_Panther = ["_", "_", "_", "_", "_", "&nbsp;", "_", "_", "_", "_", "_", "_", "_"];
var h_Black_Widow = ["_", "_", "_", "_", "_", "&nbsp;", "_", "_", "_", "_", "_"];
var h_Spider_Man = ["_", "_", "_", "_", "_", "_", "&nbsp;", "_", "_", "_"];
var h_Ant_Man = ["_", "_", "_", "&nbsp;", "_", "_", "_"];
var h_Incredible_Hulk = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "&nbsp;", "_", "_", "_", "_"];
var h_Vision = ["_", "_", "_", "_", "_", "_"];
var h_Scarlet_Witch = ["_", "_", "_", "_", "_", "_", "_", "&nbsp;", "_", "_", "_", "_", "_"];
var h_Hawkeye = ["_", "_", "_", "_", "_", "_", "_"];

//true words (the solution):
var t_Iron_Man = ["I", "r", "o", "n", "&nbsp;", "M", "a", "n"];
var t_Captain_America = ["C", "a", "p", "t", "a", "i", "n", "&nbsp;", "A", "m", "e", "r", "i", "c", "a"];
var t_Black_Panther = ["B", "l", "a", "c", "k", "&nbsp;", "P", "a", "n", "t", "h", "e", "r"];
var t_Black_Widow = ["B", "l", "a", "c", "k", "&nbsp;", "W", "i", "d", "o", "w"];
var t_Spider_Man = ["S", "p", "i", "d", "e", "r", "&nbsp;", "M", "a", "n"];
var t_Ant_Man = ["A", "n", "t", "&nbsp;", "M", "a", "n"];
var t_Incredible_Hulk = ["I", "n", "c", "r", "e", "d", "i", "b", "l", "e", "&nbsp;", "H", "u", "l", "k"];
var t_Vision = ["V", "i", "s", "i", "o", "n"];
var t_Scarlet_Witch = ["S", "c", "a", "r", "l", "e", "t", "&nbsp;", "W", "i", "t", "c", "h"];
var t_Hawkeye = ["H", "a", "w", "k", "e", "y", "e"];

//hiddenWords list:
var hiddenWords = [h_Iron_Man, h_Captain_America, h_Black_Panther, h_Black_Widow, h_Spider_Man, h_Ant_Man, h_Incredible_Hulk, h_Vision, h_Scarlet_Witch, h_Hawkeye];

//trueWords list:
var trueWords = [t_Iron_Man, t_Captain_America, t_Black_Panther, t_Black_Widow, t_Spider_Man, t_Ant_Man, t_Incredible_Hulk, t_Vision, t_Scarlet_Witch, t_Hawkeye];

//_________________________________________Mechanics________________________________________________________

//NOTE: LATER ON CREATE DICTIONARY FOR HIDDEN AND TRUE WORDS
//TO REPLACE CURRENT INPUTS IN THE FOLLOWING FUNCTIONS!!

runGame();

//Sets the game, randomly chooses a new word when a new game has started.
function runGame() {
	chooseWord();
	setWordDisplay(currentHiddenWord);
}

function chooseWord() {
	var a = Math.floor(Math.random() * 10);
	console.log("word chosen: Number "+a);
	currentHiddenWord = hiddenWords[a];
	currentTrueWord = trueWords[a];
}

//On key up, run the checkCompatible function
document.onkeyup = function(event) {
	checkCompatible(event.key, currentHiddenWord, currentTrueWord);
}

//Goes through the trueWord and checks if the chosenLetter matches any of the items in the trueWord array.
//also looks to see if the chosen letter doesn't match any letters in trueWord.
//Then runs checkComplete.
function checkCompatible(chosenLetter, hiddenWord, trueWord) {
	var a = 0;
	for (i=0; i<trueWord.length; i++) {
		if (chosenLetter.toLowerCase() == trueWord[i].toLowerCase()) {
			if (chosenLetter != SPACEBAR) { //how to detect spacebar???
				if (chosenLetter != hiddenWord[i]) {
					console.log("chosenLetter matches a letter in the trueWord!");
					reveal(chosenLetter, i, hiddenWord);
					scoreRevealedLetters();
				}
			}
		}
		else {
			a++
		}
	}
	if (a == trueWord.length) {
		var b =0;
		for (i=0; i<wrongLetters.length; i++) {
			if (chosenLetter != wrongLetters[i]) {
				b++;
			}
		}
		if ( b == wrongLetters.length) {
			console.log(lives + " lives currently");
			numWrongLetters++;
			wrongLetters.push(chosenLetter);
			addWrongLetters(chosenLetter);
			console.log("chosenLetter doesn't match any letter in the trueWord!");
			console.log("numwrongletters="+numWrongLetters);
			console.log("list of wrongletters:");
			printArray(wrongLetters);
			lives = lives - 1;
			console.log("Lives: "+lives+" after deduction");
		}
	}
	if (lives == 0) {
		gameOver(hiddenWord);
	}
	scoreLives();
	setWordDisplay(hiddenWord);
	checkComplete(hiddenWord);
}

//If the letter has not yet been revealed,
//Takes the chosenLetter and replaces the blank space in hiddenWord at that index
function reveal(chosenLetter, index, hiddenWord) {
	if (chosenLetter != hiddenWord[index]) {
		hiddenWord[index] = chosenLetter;
		numRevealedLetters++;
		revealedLetters.push(chosenLetter);
		console.log("numRevealedLetters="+numRevealedLetters);
		console.log("revealedLetters:");
		printArray(revealedLetters);
	}
}

//Goes through the hiddenWord array and checks if there are any hidden letters left.
//If the number of completedLetters matches the length of the word, numCompletedWords will
//increment, adding to the player's score, and add the word to a list of completed words.
function checkComplete(hiddenWord) {
	for (i=0; i<hiddenWord.length; i++) {
		if (hiddenWord[i] != "_" && hiddenWord[i] != "&nbsp;") {
			numCompletedLetters++;
		}
	}
	console.log("numCompletedLetters="+numCompletedLetters); //after reset numComLetters still keeping previously incremented value from previously completed Letters
	if (numCompletedLetters == actualLength(hiddenWord)) {
		numCompletedWords++;
		completedWords.push(hiddenWord);
		console.log("numCompletedWords is:"+numCompletedWords);
		printArray(completedWords);
		scoreCompletedWords(hiddenWord);
		resetWord(hiddenWord);
		setWordDisplay(hiddenWord);
		congratulate();
	}
	else {
		numCompletedLetters = 0;
	}
	console.log("hiddenWord now looks like:");
	printArray(hiddenWord);
	victory();
}

//word resets, and tracking variables too.
function resetWord(chosenArray) {
	blankSlate(chosenArray);
	lives = 7;
	revealedLetters = [];
	wrongLetters = [];
	numWrongLetters = 0;
	numCompletedLetters = 0;
	scoreLives();
	resetWrongLetters();
	console.log("hiddenWord after reset is now:");
	printArray(chosenArray);
	console.log("revealedLetters after reset is now:");
	printArray(revealedLetters);
	console.log("wrongLetters after reset is now:");
	printArray(wrongLetters);
	console.log("revealedletters is now:"+numRevealedLetters);
	console.log("wrongletters is now:"+numWrongLetters);
	console.log("completed letters is now:"+numCompletedLetters);
}

//shows the game is over, user loses, word resets.
function gameOver(chosenArray) {
	//show game over
	console.log("game over!");
	resetWord(chosenArray);
	numRevealedLetters = 0;
	scoreRevealedLetters();
	var gameOver = confirm("You failed to save the day! Try again?");
	if (gameOver) {
		runGame();
	}
	else {
		alert("Boo!");
		runGame();
	}
}

//prints chosenArray for testing purposes in the console
function printArray (chosenArray) {
	for (i=0; i<chosenArray.length; i++) {
		console.log(chosenArray[i]);
	}
}

//Takes an array for a parameter and return a value equal to the length of the array,
//minus the spaces (" ") in the word.
function actualLength(chosenArray) {
	var a = 0;
	var b = chosenArray.length;
	for (i=0; i<b; i++) {
		if (chosenArray[i] == "&nbsp;") {
			a++;
		}
	}
	return b-a;
}

//Goes through an Array and turns each non-space item into an underscore.
function blankSlate (chosenArray) {
	for (i=0; i<chosenArray.length; i++) {
		if (chosenArray[i] != "&nbsp;") {
			chosenArray[i] = "_";
		}
	}
}

//Congratulates the player, asks if they want to play again.
function congratulate() {
	var playAgain = confirm("Nice! You have indentified a hero, keep going?");
	if (playAgain) {
		runGame();
	}
	else {
		alert("Boo!");
		runGame();
	}
}

function victory() {
	if (numCompletedWords == 10) {
		var victory = confirm("You have found enough heroes to help fight Thanos! The Avengers appreciate your help. Play again?");
		if (victory) {
			resetCompletedWords();
			numRevealedLetters = 0;
			scoreRevealedLetters();
			runGame();
		}
		else {
			alert("Boo!");
			numCompletedWords = 0;
			numRevealedLetters = 0;
			scoreRevealedLetters();
			resetCompletedWords();
			runGame();
		}
	}

}

//______________________________________________Display_____________________________________________________


//Sets the word display for the hidden word on the primary Display.
//This is where we will show the revealed letters and update the hiddenWord.
function setWordDisplay (hiddenWord) {
	var showWord = "";
	for (i=0; i<hiddenWord.length; i++) {
		showWord = showWord + " " + hiddenWord[i] + " ";
	}
	document.getElementById("primaryDisplay").innerHTML = showWord;
}

function scoreLives () {
	document.getElementById("livesDisplay").innerHTML = "Lives: " + lives;
}

//Adds the chosen letter to the secondaryDisplay.
//This is where we will show the wrong letters.
function addWrongLetters (chosenLetter) {
	document.getElementById("secondaryDisplay").innerHTML = document.getElementById("secondaryDisplay").innerHTML + " " + chosenLetter + ", ";
}

//Resets Wrong Letters.
function resetWrongLetters() {
	document.getElementById("secondaryDisplay").innerHTML = "Wrong Letters: ";
}

//Shows points for letters user has revealed.
function scoreRevealedLetters () {
	document.getElementById("scoreDisplay1").innerHTML = "Score: " + numRevealedLetters;
}

//Shows list of words user has completed.
function scoreCompletedWords (hiddenWord) {
	var showWord = " ";
	for (i=0; i<hiddenWord.length; i++) {
		showWord = showWord + " " + hiddenWord[i] + " ";
	}
	document.getElementById("scoreDisplay2").innerHTML = document.getElementById("scoreDisplay2").innerHTML + "<br>" + showWord;
}

//Resets the completed word list after a victory.
function resetCompletedWords() {
	document.getElementById("scoreDisplay2").innerHTML = "Heroes Found: ";
}




