/*
=======================
04 - Bad Word Detection - index.js
=======================
Student ID: 23651127
Comment (Required): This file deals with offering a line for the user to enter some text and displaying a counter of bad words.
Here are the steps for accomplishin this:
1 - Add necessary imports
2 - Define a function that offers a new line on console. 
3 - Instantiate a new BadWordEmitter with readile interface and a list of bad words.
4 - Add a badword listener to the BadWordEmitter object. When event happens, update the counter of bad words
5 - The readline interface listens for line events and calls function to add a new line to user on console.

Vagner Machado
=======================
*/
const readline = require("readline");
const BadWordEmitter = require("./modules/BadWordEmitter");
const badBadWords = require('./data/badwords.json')
const rl = readline.createInterface({input: process.stdin, output:process.stdout});

//controls where prompt will display
let current_line = 1;

//a prompt line
const shell_prompt = function()
{
	current_line++;
	process.stdout.cursorTo(0, current_line);
	process.stdout.write("> ")
}

//instantiate a BadWordEmitter with the readline and the list of bad words
let badWord = new BadWordEmitter(rl, badBadWords);

//on line event, offer a new line to user to type into
rl.on("line", shell_prompt);

//counter for the words that are bad
let badCounter = 0;

//add a badword listener to the BadWordEmitter object to handle the counter and display
badWord.on("badword", () => 
{   
	//could just reprint the count on following instantiations
	process.stdout.cursorTo(21, 0);
	console.log("|  Bad Word Count", ++badCounter ); //shell_prompt();
});

//start the app
console.clear();
console.log("Welcome to the chat")
shell_prompt();
















