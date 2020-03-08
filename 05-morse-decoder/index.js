/*
=======================
05 - Morse Decoder - index.js
=======================
Student ID: 23651127
Comment (Required): This class listens to events emitted form the MorseEmitter class.
For that, it instantiates a MorseEmitter object and turns on listers for:
	1 - Event ".": adds a dot character to morse_character.
	2 - Event "-": adds a dash character to morse_character.
	3 - Event "break": Indicates the end of a character encoding. 
		3.1 - It prints the character onto console.
		3.2 - Resets morse_character to ""
	
	Vagner
=======================
*/
const MorseEmitter = require("./modules/MorseEmitter");
const MorseEmitterEncrypted = require("./modules/MorseEmitterEncrypted");
const morse_Char = require("./data/moorse-code-reverse.json");
const morse_Char_Code = require("./data/morse-code.json"); //original

let morse_emitter = new MorseEmitter("h3Y 7h3re cH13F! C4ts AnD D0g5 are pa1S.. (50me7IM35!)");
let morse_character = "";
let place = 0;

//no spec is sent by emitter, kept here as 'tradition' !

//listens for "." event and adds dot to morse_character
morse_emitter.on(".", (spec) => 
{
	morse_character += ".";
});

//listens for "-" event and adds a dash to morse_character
morse_emitter.on("-", (spec) => 
{
	morse_character += "-";
});

//listens to a "break" event and prints a character to console. Resets the morse_character variable
morse_emitter.on("break", (spec) => 
{
	if(place === 0)
		console.clear();
	process.stdout.cursorTo(place++, 0);
	process.stdout.write(morse_Char[morse_character]);
	morse_character = "";
});


morse_emitter.start();