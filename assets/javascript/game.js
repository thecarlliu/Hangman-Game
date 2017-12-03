
//__________________________________Hangman-Game: Marvel Edition___________________________________________

//VARIABLES:
var userInput;

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
//h = hidden
//t = true

//hidden words:
var h_Iron_Man = ["_", "_", "_", "_", " ", "_", "_", "_"];

//true words (the solution):
var t_Iron_Man = ["I", "r", "o", "n", " ", "M", "a", "n"];

//var dictionary for list of h and t words:
//var wordList = {

//_________________________________________Mechanics________________________________________________________

//NOTE: LATER ON CREATE DICTIONARY FOR HIDDEN AND TRUE WORDS
//TO REPLACE CURRENT INPUTS IN THE FOLLOWING FUNCTIONS!!

//On key up, run the checkCompatible function
document.onkeyup = function(event) {
	addToPrimaryDisplay(event.key); //testing TEMPORARY
	checkCompatible(event.key, h_Iron_Man, t_Iron_Man);
}

//NEED RUN GAME FUNCTION THAT WILL CALL CHECKCOMPATIBLE AND WORK FOR ANY Pair of ARRAYs!!^^ chosen by setGame();
//AND A SET GAME FUNCTION THAT WILL DETERMINE WHICH HWORD AND TWORD TO BE USED. randomly chosen via wordlist

//Goes through the trueWord and checks if the chosenLetter matches any of the items in the trueWord array.
//also looks to see if the chosen letter doesn't match any letters in trueWord.
//Then runs checkComplete.
function checkCompatible(chosenLetter, hiddenWord, trueWord) {
	var a = 0;
	for (i=0; i<trueWord.length; i++) {
		if (chosenLetter.toLowerCase() == trueWord[i].toLowerCase()) {
			if (chosenLetter != " ") {
				if (chosenLetter != hiddenWord[i]) {
					console.log("chosenLetter matches a letter in the trueWord!");
					reveal(chosenLetter, i, hiddenWord);
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
			numWrongLetters++;
			wrongLetters.push(chosenLetter);
			console.log("chosenLetter doesn't match any letter in the trueWord!");
			console.log("numwrongletters="+numWrongLetters);
			console.log("list of wrongletters:");
			printArray(wrongLetters);
		}
	}
	if (numWrongLetters == lives) {
		gameOver(hiddenWord);
	}
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
		if (hiddenWord[i] != "_" && hiddenWord[i] != " ") {
			numCompletedLetters++;
		}
	}
	console.log("numCompletedLetters="+numCompletedLetters); //after reset numComLetters still keeping previously incremented value from previously completed Letters
	if (numCompletedLetters == actualLength(hiddenWord)) {
		numCompletedWords++;
		completedWords.push(hiddenWord);
		console.log("numCompletedWords is:"+numCompletedWords);
		printArray(completedWords);
		resetWord();
	}
	else {
		numCompletedLetters = 0;
	}
	console.log("hiddenWord now looks like:");
	printArray(hiddenWord);
}

//word resets, and tracking variables too.
function resetWord(chosenArray) {
	blankSlate(chosenArray);
	revealedLetters = [];
	wrongLetters = [];
	numRevealedLetters = 0;
	numWrongLetters = 0;
	numCompletedLetters = 0;
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
		if (chosenArray[i] == " ") {
			a++;
		}
	}
	return b-a;
}

//Goes through an Array and turns each non-space item into an underscore.
function blankSlate (chosenArray) {
	for (i=0; i<chosenArray.length; i++) {
		if (chosenArray[i] != " ") {
			chosenArray[i] = "_";
		}
	}
}

//______________________________________________Display_____________________________________________________

//Calls addLetter and appends the created element from that to the primaryDisplay.
function addToPrimaryDisplay (chosenLetter) {
	var display = document.getElementById("primaryDisplay");
	display.appendChild(addLetter(chosenLetter));
}

//Creates a single letterDisplay element and appends the chosenLetter
function addLetter (chosenLetter) {
	var eachLetterDisplay = document.createElement("p");
	chosenLetter = eachLetterDisplay.innerHTML;
}

//change above functions to jquery stuff, and still getting not of type node exception
//maybe translate event key to text function is needed.





