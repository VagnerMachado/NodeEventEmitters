/*
=======================
05 - Morse Decoder - index.js
=======================
Student ID:
Comment (Required):

=======================
*/
const MorseEmitter = require("./modules/MorseEmitter");
const MorseEmitterEncrypted = require("./modules/MorseEmitterEncrypted");
const morse_Char = require("./data/moorse-code-reverse.json");
const morse_Char_Code = require("./data/morse-code.json"); //original

let morse_emitter = new MorseEmitter("(h3Y, C4ts And D0g5 are pa1S!)");
let morse_character = "";
let place = 0;

//no spec is sent by emitter, kept here as 'tradition' !
morse_emitter.on(".", (spec) => 
{
	morse_character += ".";
});

morse_emitter.on("-", (spec) => 
{
	morse_character += "-";
});

morse_emitter.on("break", (spec) => 
{
	if(place === 0)
		console.clear();
	process.stdout.cursorTo(place++, 0);
	process.stdout.write(morse_Char[morse_character]);
	morse_character = "";
});


//morse_emitter.start();