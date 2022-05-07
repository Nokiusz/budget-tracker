const express = require('express');
const cors = require('cors');
/* Routes */
const transactionsRoute = require('./routes/Transactions');
const categoriesRoute = require('./routes/Categories');
const currenciesRoute = require('./routes/Currencies');
const typesRoute = require('./routes/Types');
const prioritiesRoute = require('./routes/Priorities');
/* */

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get('/', (req, res) => {
    res.json({ "message": "Hello There" })
});

app.use('/api/transactions', transactionsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/currencies', currenciesRoute);
app.use('/api/types', typesRoute);
app.use('/api/priorities', prioritiesRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});

/* ERROR IF ENDPOINT DOES NOT EXIST */
app.use(function (req, res, next) {
    res.status(404).send({ error: 'Not found' })
})
