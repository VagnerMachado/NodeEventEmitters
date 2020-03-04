/*
=======================
02 - Quote of the Day - index.js
=======================
Student ID: 23651127
Comment (Required): This is the second and improved implementation, so it is neater. 
The first implementation did some of the QuoteEmitter logic in index.js, so it became convoluted.
The second version is streamlined and index.js is simple. 
These are the steps I followed for the implementation:
1 - day_emitter listens to new day events and prints the date upon event
2 - instantiated a single quote emitter that listens to qotd event and prints a randomly sent quote
3 - start the day_emitter to start the app

Vagner Machado
=======================
*/
const DayEmitter = require("./modules/DayEmitter");
const QuoteEmitter = require("./modules/QuoteEmitter");
const day_emitter = new DayEmitter(2400);

//prints the data on first line upon a newday event
day_emitter.on("newday", function({mm_dd})
{
	process.stdout.cursorTo(0, 0);
	console.clear();
	console.log(mm_dd);
});
//instantiate a Quote Emitter and listen to qotd events
let quote = new QuoteEmitter(day_emitter);
quote.on("qotd", function(quote)
	{
		process.stdout.cursorTo(0, 1);
		console.log(quote);	
		process.stdout.cursorTo(0, 1);
	});

//start DayEmitter
day_emitter.start();

