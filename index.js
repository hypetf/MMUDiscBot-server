require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { PORT, SESSION_SECRET, CLIENT_URL } = process.env;
const serverPort = PORT || 5000;
const routes = require('./routes');
const app = express();

app.use(cors({
    origin: CLIENT_URL
}))

app.use(
    session({
        secret: SESSION_SECRET,
        name: 'connect.sid',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000 * 24
        }
    })
);

app.use((req, res, next) => {
    req.setTimeout(30000, () => {
        let err = new Error('Request Timeout');
        err.status = 408;
        next(err);
    });
    res.setTimeout(20000, () => {
        let err = new Error('Service Unavailable');
        err.status = 503;
        next(err);
    });
    next();
})

app.use('/api', routes);

app.listen(serverPort, () => {console.log(`Server running on PORT ${serverPort}`)});