const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const router = require('./routes/db');
const loadRouter = require('./routes/load');

const app = express();
app.use(compression());
app.use(bodyParser.json({type: 'application/json'}));

const PORT = process.env.WEB_SERVER_PORT || 9002;
const ROOT = 'web';

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

app.use('/', express.static(ROOT));
app.use('/askdb', router);
app.use('/load', loadRouter);

app.use('', (req, res, next) => {
    res.send('No matching routes found');
});

app.listen(PORT, () => {
    console.log('SUCCESS: Server started at post: ', PORT);
});
