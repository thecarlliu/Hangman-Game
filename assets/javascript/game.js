
//__________________________________Hangman-Game: Marvel Edition___________________________________________

//VARIABLES:
var userInput;

//Vars that track values:
var revealedLetters = [];
var numRevealedLetters =0;
var wrongLetters = [];
var numWrongLetters = 0;
var lives = 7;
var completedLetters = 0;
var completedWords = 0;

//Our Words:
//h = hidden
//t = true

//hidden words:
var h_Iron_Man = ["_", "_", "_", "_", " ", "_", "_", "_"];

//true words (the solution):
var t_Iron_Man = ["I", "r", "o", "n", " ", "M", "a", "n"];

//__________________________________________________________________________________________________________
//NOTE: LATER ON CREATE DICTIONARY FOR HIDDEN AND TRUE WORDS
//TO REPLACE CURRENT INPUTS IN THE FOLLOWING FUNCTIONS!!

//On key up, run the checkCompatible function
document.onkeyup = function(event) {
	checkCompatible(event.key, h_Iron_Man, t_Iron_Man);
}

//Goes through the trueWord and checks if the chosenLetter matches any of the items in the trueWord array.
//also looks to see if the chosen letter doesn't match any letters in trueWord.
//Then runs checkComplete.
function checkCompatible(chosenLetter, hiddenWord, trueWord) {
	var a = 0;
	for (i=0; i<trueWord.length; i++) {
		if (chosenLetter.toLowerCase() == trueWord[i].toLowerCase()) {
			reveal(chosenLetter, i, h_Iron_Man);
		}
		else {
			a++
		}
	}
	if (a == trueWord.length) {
		numWrongLetters++;
		wrongLetters.push(chosenLetter);
	}
	if (numWrongLetters == lives) {
		gameOver();
	}
	checkComplete(hiddenWord);
}

//If the letter has not yet been revealed,
//Takes the chosenLetter and replaces the blank space in hiddenWord at that index
function reveal(chosenLetter, index, hiddenWord) {
	if (chosenLetter != hiddenWord[index]) {}
		chosenLetter = hiddenWord[index];
		numRevealedLetters++;
		revealedLetters.push(chosenLetter);
	}

//Goes through the hiddenWord array and checks if there are any hidden letters left.
//If the number of completedLetters matches the length of the word, numCompletedWords will
//increment, adding to the player's score, and add the word to a list of completed words.
function checkComplete(hiddenWord) {
	for (i=0; i<hiddenWord.length; i++) {
		if (hiddenWord[i] != "_") {
			numCompletedLetters++;
		}
	}
	if (numCompletedLetters = hiddenWord.length) {
		numCompletedWords++;
		completedWords.push(hiddenWord);
		resetWord();
	}
	else {
		var numCompletedLetters = 0;
	}
}

function resetWord() {
	var h_Iron_Man = ["_", "_", "_", "_", " ", "_", "_", "_"];
	var revealedLetters = [];
	var numRevealedLetters = 0;
	var numWrongLetters = 0;
	var numCompletedLetters = 0;
}

function gameOver() {
	//show game over
	resetWord();
}