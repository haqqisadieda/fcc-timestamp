// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
    const date = req.params.date;
    let dateString, unix, utc;
    if (!date) {
        newDate = new Date();
        utc = newDate.toUTCString();
        unix = newDate.getTime();
        res.json({ unix, utc });
    } else if (date.includes('-')) {
        dateString = date.split('-');
        newDate = new Date(
            parseInt(dateString[0]),
            parseInt(dateString[1]) - 1,
            parseInt(dateString[2])
        );
        utc = newDate.toUTCString();
        unix = newDate.getTime();
        res.json({ unix, utc });
    } else if (
        date.includes('-') === false &&
        !isNaN(parseFloat(date)) &&
        isFinite(date) === true
    ) {
        dateString = parseInt(date);
        unix = dateString;
        utc = new Date(unix).toUTCString();
        res.json({ unix, utc });
    } else if (!(date instanceof Date) || isNaN(date.getTime())) {
        res.json({ error: 'Invalid Date' });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
