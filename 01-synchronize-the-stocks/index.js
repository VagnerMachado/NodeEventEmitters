/*
=======================
01 - Synchronize the Stocks - QuoteEmitter.js
=======================
Student ID: 23651127
Comment (Required): This assignment required to replace a call to
console.log for each stock in the portfolio by a single call to
console.table to print the portfolio data. I decided to use the
length of the portfolio to decided when to all the console.table
function. The steps for the updated code to accomplish the task
above is as follows:
	1 - declare an array where stock data will be inserted
	2 - get the length of portfolio (# of stocks)
		this field will determine when all stocks were updated
		and inserted into array.
	3 - declare an index variable to control array insertion.
	4 - erase a previously written line in console. (see below)
	5 - use object parameters in fuction for "newday" listener
		to instantiate an object and insert into array.
	6 - case portfolioIndex == portfolio length:
		6.1 - print table
		6.2 - empty array
		6.3 - reset array index.


Vagner Machado
=======================
*/

const Stock = require("./modules/Stock");
const DayEmitter = require("./modules/DayEmitter");
const portfolio_data = require("./data/stocks.json");
const day_emitter = new DayEmitter(2400);
let portfolio = portfolio_data.map(stock => new Stock({...stock, day_emitter}));
let current_line = portfolio.length + 4; // accounts for the offset created
										 // by table header and borders

//add a few variables to track locations
let portfolioArray = [portfolio.length];
let loopCounter = portfolio.length;
let portfolioIndex = 0;

portfolio.forEach(function(stock, index){
	stock.on("newday", function({ticker, name, price, previous, change})
	{
		/* I think the two lines below are not needed in a real life large processing
		   situation because if data takes long to process, each lines starts
		   disappearing from the top down,one by onw, slowly. Then new table is
		   printed. Removing the two lines below would just overwrite the
		   existing table once the new one is ready to print. Is that valid?
        */

		process.stdout.cursorTo(0, index + 4); // 4 accounts for skipping table header.
		process.stdout.clearLine(); 		   // clears peviously written line, if any

		//colorChange = change < 0 ? color.red(change) : color.green(change);

		portfolioArray[portfolioIndex++] = {"  Ticker " : ticker,
											"   Name  " : name,
											"  Price  " : Number(price.toFixed(2)),
											" Previous" : Number(previous.toFixed(2)),
											"  Change " : Number(change.toFixed(2))
										   }
		// On each newday console.log is called |portfolio.length| number of times.
		// Replace all these calls with a single console.table.
		if(portfolioIndex == loopCounter)
		{
			process.stdout.cursorTo(0, 1);
			console.table(portfolioArray);
			process.stdout.cursorTo(0, current_line);
			portfolioArray = [portfolio.length];
			portfolioIndex = 0;
		}
	});
});

//set listener or newday event and print date when it happens
day_emitter.on("newday", function({mm_dd}){
	process.stdout.cursorTo(0, 0);
	process.stdout.clearLine();
	process.stdout.write("			       Stock Activity for " + mm_dd).toUpperCase;
	process.stdout.cursorTo(0, current_line);
});
day_emitter.start();


/*   PLEASE IGNORE THE CHUNK BELOW. I WAS TRYIN TO FIX THE PRICE FOR WHEN THE
CENTS ARE MULTIPLE OF 10. FOR EXAMPLE, THEY DISPLAY AS 36.8 INSTEAD OF 36.80. JUST WANTED
TO LEARN HOW TO FORMAT IT IN JAVASCRIPT, CODE IS HERE FOR REFERENCE

portfolioArray[portfolioIndex++] = {"  Ticker " : ticker,
											"   Name  " : name,
											"  Price  " : new Intl.NumberFormat('en-US',
																			   {style: 'currency',
																			   currency: 'USD'}).format(price.toFixed(2)),
											" Previous" : new Intl.NumberFormat('en-US',
																			   {style: 'currency',
																			   currency: 'USD'}).format(previous.toFixed(2)),
											"  Change " : new Intl.NumberFormat('en-US',
																			   {style: 'currency',
																				currency: 'USD'}).format(change.toFixed(2))
										   }
									}
src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
	*/
