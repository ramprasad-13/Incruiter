const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const helmet = require('helmet');

const port= process.env.PORT || 3000;

//connect to database
const db = require('./services/connection');
db();


corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const authRoutes = require('./authRoutes');
const auth = require('./middlewares/auth');

app.use('/api/protected',auth,authRoutes)

const routes = require('./routes');
app.use('/api/auth', routes);

app.get('/', (req, res) => {
    res.send('App is up and running');
});

const verify = require('./controllers/verify');
app.get('/verify/:token',verify);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
