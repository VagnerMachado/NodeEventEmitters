/*
=======================
04 - Bad Word Detection - BadWordEmitter.js
=======================
Student ID: 23651127
Comment (Required): The BadWordEmitter extens EventEmitter to inherit its fuctionalities.
The constructor accepts a readline and an array of badBadReallyBadWords!
While the readline listen to line events, it compares the words entered in a new line to the a list of badWords.
Case the user entered a bad word, the BadWordEmitter emits a badword event.
This event causes the badword listener to update a badWordConter in index.js
REGEX links provided for sites researched.
Vagner Machado
=======================
*/
const EventEmitter = require('events');
class BadWordEmitter extends EventEmitter
{
	constructor(rl, badBadReallyBadWords)
	{
		super();
		rl.on("line", (data) => 
		{ 
			let i = 0;
			let j = 0;
			//regex used: slash / starts and ends regex, insert chars for delim in [ ] withing / /, use scape \ to add [^*\/?+] as splitters
			let arr = data.split(/[.,\\\/:; \'\"\\=[\]\|\\`\~\\@\#*\$\%\{\}_\-\+\^\*\\&(\)\?<>]/); //research source below
			for(i in badBadReallyBadWords)
				for(j in arr)
					if(badBadReallyBadWords[i] === arr[j])	
						this.emit('badword');
		});
	}
	/** links left here for reference, plase ignore */
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	//https://www.tracedynamics.com/javascript-split-string-method/
	
}
module.exports = BadWordEmitter;