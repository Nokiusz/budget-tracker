const express = require('express');
const cors = require('cors');
/* Routes */
const transactionsRoute = require('./routes/Transactions');
const categoriesRoute = require('./routes/Categories');
const currenciesRoute = require('./routes/Currencies');
const typesRoute = require('./routes/Types');
const prioritiesRoute = require('./routes/Priorities');
const attachmentsRoute = require('./routes/Attachments');
const db = require('./db');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

app.get('/', (req, res) => {
    res.json({ "message": "Hello There" })
});

app.use('/api/transactions', transactionsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/currencies', currenciesRoute);
app.use('/api/types', typesRoute);
app.use('/api/priorities', prioritiesRoute);
app.use('/api/attachments', attachmentsRoute);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get("/api/lastTransaction", (req, res) => {
    const query = `SELECT ROWID FROM 'transaction' ORDER BY ROWID DESC LIMIT 1`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(400).json({ "error": err.message })
        }
        console.log(rows);
        res.json({ rows })
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});

/* ERROR IF ENDPOINT DOES NOT EXIST */
app.use(function (req, res, next) {
    res.status(404).send({ error: 'Not found' })
})
