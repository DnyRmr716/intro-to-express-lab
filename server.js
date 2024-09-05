const express = require('express')
const app = express()

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/greeting/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`); 
});



app.get('/roll/:diceSize', (req, res) => {
    const diceSize = +req.params.diceSize;
  
    if (isNaN(diceSize)) {
      res.send('You must specify a number.');
    } else {
      const rollResult = Math.floor(Math.random() * (diceSize + 1)); 
      res.send(`You rolled a ${rollResult}.`);
    }
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  
  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10); 
  
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
      res.send('This item is not yet in stock. Check back soon!');
    } else {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});

app.get('/shoes', (req, res) => {
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
  
    let filteredShoes = shoes;
  
    if (minPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
    }
  
    if (maxPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }
  
    if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
  
    // Format the response as plain text
    const responseText = filteredShoes.map(shoe => 
      `Name: ${shoe.name}, Price: $${shoe.price.toFixed(2)}, Type: ${shoe.type}`
    ).join('\n');
  
    res.send(responseText); 
});



app.listen(3000, function(){
	console.log('Express App is listening for http requests on port: 3000')
})