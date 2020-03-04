/*
=======================
02 - Quote of the Day - QuoteEmitter.js
=======================
Student ID: 23651127
Comment (Required): This file extends the events module and becomes an emitter itself by inheritance. 
QuoteEmitter is a simple file in which it defines the constructor for the QuoteEmitter objects as such:
	1- Accept a DayEmitter object into constructor as parameter.
	2- call the super class constructor to get all parent functionalities
	3- day_emitter object is defined to emit "newday" events in DayEmitter file.
	4- Use fact in (3) to force this Quote Emitter to emit a "qotd" when a its day_emitter listens to a "newday" event.
	5- "qotd" emits a random quote to listening Quote Emitter Objects.
	
	I like Paulo Coelho, he is the author of one of the quotes listed.
	   
Vagner Machado
=======================
*/
const EventEmitter = require('events');
const quote_data = require("../data/quotes.json");

let quote = () => {return quote_data[Math.floor(Math.random() * quote_data.length)];}

class QuoteEmitter extends EventEmitter 
{
	constructor(day_emitter)
	{
		super();
		this.day_emitter = day_emitter;
		//set listener for newday event
		day_emitter.on("newday", ({mm_dd}) => 
		{
			this.emit("qotd", quote());
		})
	}
}
module.exports = QuoteEmitter;

