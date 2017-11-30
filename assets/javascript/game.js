
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
			console.log("chosenLetter matches a letter in the trueWord!");
			reveal(chosenLetter, i, h_Iron_Man);
		}
		else {
			a++
		}
	}
	if (a == trueWord.length) {
		numWrongLetters++;
		wrongLetters.push(chosenLetter);
		console.log("chosenLetter doesn't match any letter in the trueWord!");
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
		hiddenWord[index] = chosenLetter;
		numRevealedLetters++;
		revealedLetters.push(chosenLetter);
		console.log("numRevealedLetters="+numRevealedLetters);
		console.log("revealedLetters:");
		printArray(revealedLetters);
	}

//Goes through the hiddenWord array and checks if there are any hidden letters left.
//If the number of completedLetters matches the length of the word, numCompletedWords will
//increment, adding to the player's score, and add the word to a list of completed words.
function checkComplete(hiddenWord) {
	for (i=0; i<hiddenWord.length; i++) {
		if (hiddenWord[i] != "_") {
			numCompletedLetters++;
			console.log("numCompletedLetters="+numCompletedLetters);
		}
	}
	if (numCompletedLetters == hiddenWord.length) {
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
function resetWord() {
	h_Iron_Man = ["_", "_", "_", "_", " ", "_", "_", "_"];
	revealedLetters = [];
	wrongLetters = [];
	numRevealedLetters = 0;
	numWrongLetters = 0;
	numCompletedLetters = 0;
	console.log("hiddenWord after reset is now:");
	printArray(h_Iron_Man);
	console.log("revealedLetters after reset is now:");
	printArray(revealedLetters);
	console.log("wrongLetters after reset is now:");
	printArray(wrongLetters);
	console.log("revealedletters is now:"+numRevealedLetters);
	console.log("wrongletters is now:"+numWrongLetters);
	console.log("completed letters is now:"+numCompletedLetters);
}

//shows the game is over, user loses, word resets.
function gameOver() {
	//show game over
	console.log("game over!");
	resetWord();
}

//prints chosenArray for testing purposes in the console
function printArray (chosenArray) {
	for (i=0; i<chosenArray.length; i++) {
		console.log(chosenArray[i]);
	}
}

//need a function to check for spaces, in order to subtract that from the actual length of the hidden word
//and to prevent a space from counting as a revealed letter.
//also forsomereason completedletters is adding an extra in the beginning.
//and a final function is needed to restore the lowercase to an uppercase when the hidden word is completed.
//then we can move onto the display functions and the html + css






