/*
=======================
05 - Morse Decoder - MorseEmitter.js
=======================
Student ID: 23651127
Comment (Required): Goal of the class is to encode a string using morse code and emit events according to encoding. 
Here are the steps to acomplish this task: 
 1 - The MorseEmitter class accepts a string of data as constructor parameter.
 2 - This string has all spaces removed.
 3 - For each character in the contructor string:
	 3.1 - Get a character
	 3.2 - Use Json data to map character to morse code
	 3.3 - For each symbol in character's morse code:
		   3.3.1 - emit a event that correspond to the morse code character.
		   3.3.2 - this emit will then be either "." or "-" ( character used to encode in morse)
	 3.4 - emit a "break" event to signal the end of a character 

Vagner Machado
=================
*/
const EventEmitter = require('events');
const morse = require("../data/moorse-code.json");

class MorseEmitter extends EventEmitter 
{
	constructor(data)
	{
		super();
		this.data = data;
		this.data = this.data.replace(/\s/g,""); //remove all spaces
	}	
	 //starts to encryption and decryption of morse code.
	 start()
    {
	 let indexIn = 0;
		 //for each character in input
		 for(indexIn in this.data)
		 {
		    //get the morse code for the character
			let code = morse[this.data[indexIn].toUpperCase()];
			let indexOut = 0;
			//for each symbol in morse code, emit that symbol then break event at the end
			for(indexOut in code)
				this.emit(code[indexOut], {});
			this.emit("break", {})
		 }		
	}	
}
module.exports = MorseEmitter;
