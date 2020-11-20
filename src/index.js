require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enabled...');
}

app.use('/api', routes);

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));