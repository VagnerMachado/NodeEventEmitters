/*
=======================
03 - Price Notifications - index.js
=======================
Student ID: 23651127
Comment (Required): This is th emain driver for the price notification application. 
It follows these steps to accomplish the requirements:
1 - import needed modules
2 - instantiate all the stock objects based on .json data and insert them into portfolio
3 - add a listener for newday events to each stock in portfolio and define what happens upon a newday
4 - instantiate all StockEmitter objects based on portfolio data and the .json data for alerts
5 - add a price_alert listener to all PriceEmitter objects, and define what happens upon an price_alert
=======================
*/
const DayEmitter = require("./modules/DayEmitter");
const Stock = require("./modules/Stock");
const PriceEmitter = require("./modules/PriceEmitter");
const portfolio_data = require("./data/stocks.json");
const stock_alerts = require("./data/stock-alerts.json");
const day_emitter = new DayEmitter(2400);

//read all the stock information in an instantiate Stock object
let portfolio = [portfolio_data.length];
for (i in  portfolio_data)
{
	let name = portfolio_data[i]["name"];
	let ticker = portfolio_data[i]["ticker"];
	let price = portfolio_data[i]["price"];
	portfolio[i] = new Stock({ticker, name, price,undefined, undefined ,day_emitter});
}

//set for each stock a listener for a newday event
let current_line = portfolio.length + 1;
portfolio.forEach(function(stock, index)
{
		stock.on("newday", function({ticker, name, price, previous, change})
	{
		process.stdout.cursorTo(0, index + 1);
		process.stdout.clearLine();
		console.log(`${ticker}  ${name}\t\t${price.toFixed(2)}\t\t${change.toFixed(2)}`);
		process.stdout.cursorTo(0, current_line);
	});
});

//instantiate a PriceEmitter objects
let alerts = [];
for(i in portfolio)
	for( j in stock_alerts)
	{
		if(portfolio[i]["ticker"] === stock_alerts[j]["ticker"])
			alerts.push(new PriceEmitter(portfolio[i], stock_alerts[j]["target_price"], stock_alerts[j]["direction"]));
	}
	
//add a listener to price_alert to all the PriceEmitter objects
alert_location = current_line;
for(i in alerts)
{
	alerts[i].on("price_alert", function(spec)
					{
						let {mm_dd, ticker, target_price, direction, price} = spec;
						process.stdout.cursorTo(0, alert_location++);
						console.log(`Price Alert: (${ticker}: $${price}) went ${direction} $${target_price} on ${mm_dd}`);
					});
}	
	
// handle a newday event	
day_emitter.on("newday", function(spec){
	let {mm_dd} = spec;
	process.stdout.cursorTo(0, 0);
	process.stdout.clearLine();
	process.stdout.write(mm_dd);
	process.stdout.cursorTo(0, current_line);
});

//start the new day emiision and therefore the app itself
day_emitter.start();
















