const connectToMongo = require('./db');
const express = require('express')


connectToMongo();

const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello User!'));

app.use(express.json())
app.use('/authenticate', require('./routes/auth'));
app.use('/expenses', require('./routes/expenses'));

app.get('/signup', (req, res) => {
    res.send('You tried to signup')
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});