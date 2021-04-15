const quotes = [
	{ image: require('./quote1.png') },
	{ image: require('./quote2.png') },
]

let randomQuoteIndex = Math.floor(Math.random() * quotes.length);
let randomQuote = quotes[randomQuoteIndex].image;

export default randomQuote;
