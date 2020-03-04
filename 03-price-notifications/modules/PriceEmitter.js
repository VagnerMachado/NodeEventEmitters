/*
=======================
03 - Price Notifications - PriceEmitter.js
=======================
Student ID: 23651127
Comment (Required): Where to start? This was a very concise and very interesting class to code. First, after a while, came to me that I could use the newday listener in stock to listen for newday events. Before that, i had a version that passed in the day_emitter object (which worked but it was wrong/unnecessary).
Yet, the most time consuming debug, was the fact i was using a function in the stock.on listener instead of the arrow function. I could not get why the console log of this was a stock and not a PriceEmitter. Then I recalled you mentioning that during lecture and checked the Stock class and noticed the arrow function in the listener. Checked a few other examples and now all is working. 

This class definied a PriceEmitter object to have a Stock, a target price for the stock and a price direction.
The stock has a day_emitter and itself also emits a newday upon a new day from the day_emitter.
This enabled to use the .on in the stock to listen for a newday and emit a price_alert if conditions are met.

Vagner Machado
=======================
*/
const EventEmitter = require('events');
class PriceEmitter extends EventEmitter 
{
	constructor(stock, target_price, direction)
	{
		super();
		
		//instance data not needed, code kept for reference
		/*this.target_price = target_price;
		this.direction = direction;
		this.stock = stock;*/
		
			//constructor adds a listener for a newday event
			stock.on
				("newday", ({mm_dd, ticker, name, price, previous, change}) => //arrow function
						   {	
							//when a new day happens and if the conditions are met, a new price_alert is emitted
							if((price > target_price && direction === "above") || (price < target_price && direction === "below"))
								this.emit("price_alert", {mm_dd, ticker, target_price, direction, price});
						   }			   
			    );
	}	
}
module.exports = PriceEmitter;
