const express = require('express');
const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 3000;

const app = express();
const morgan = require('morgan');

//This needs to be BEFORE app.use((req,res,next)=>{...});
app.use(morgan('dev'));


//Routers:
const dishRouter = require('./routes/dishRouter');
app.use('/dishes', dishRouter);

const promotionRouter = require('./routes/promoRouter');
app.use('/promotions', promotionRouter);

const leaderRouter = require('./routes/leaderRouter');
app.use('/leaders', leaderRouter);


//This needs to be BEFORE app.use((req,res,next)=>{...});
app.use(express.static(__dirname + '/public'));

//It seems this needs to be the LAST app.use() statement.
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express server!</h1></body></html>');
});

const server = http.createServer(app);

server.listen(PORT, HOSTNAME, () => {
    console.log(`Express server running at http://${HOSTNAME}:${PORT}/`);
});