const express = require('express');
const app = express();

let { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.json({quote : randomQuote})
})

app.get('/api/quotes', (req, res) => {
    const person = req.query.person;
    if(person) {
        const filteredQuotes = quotes.filter(quote => quote.person === person);  
        res.json({quotes: filteredQuotes});
    } else {
    res.json({quotes})}
})

app.post('/api/quotes', (req,res) => {
    const person = req.query.person;
    const quote = req.query.quote;
    const id = quotes.length +1;
    if(person && quote) {
        quotes.push(...[{ id: id, quote: quote, person: person}])
        res.status(202).send();
    } else {
        res.status(400).send();
    }
}
)

app.delete('/api/quotes/:id', (req, res) => {
    const idToDelete = req.params.id;
    const found = quotes.findIndex((quote) => quote.id === idToDelete)
    if (found !== -1) {
        quotes.splice(found, 1);
        res.status(204).send();
      } else {
        res.status(404).send({ error: 'Quote not found' });
      }
})   


app.delete('/api/quotes', (req, res) => {
    const person = req.query.person;
    if (person) {
      const initialLength = quotes.length;
      quotes = quotes.filter(quote => quote.person !== person);
  
      if (quotes.length < initialLength) {
        res.status(204).send();
      } else {
        res.status(404).send({ error: 'No quotes found for the specified person' });
      }
    } else {
      res.status(400).send({ error: 'No person specified' });
    }
  });
