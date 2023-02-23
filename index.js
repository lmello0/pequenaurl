const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const generateShortUrl = require('./public/pages/functions');
const URL = require('./models/URL');

const DOMAIN = 'localhost:3000/'

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

// routes

app.get('/', (req, res) => {
    let url = req.session.url;
    req.session.url = null;

    if (url) {
        res.render('index', { newUrl: url });
    } else {
        res.render('index', { newUrl: null });
    }
});

app.get('/:shortUrl', async (req, res) => {
    const urlParam = req.params.shortUrl
    const url = await URL.findOne({ shortUrl: urlParam }).exec();

    if (url != undefined) {
        res.redirect(url.originalUrl);
    } else {
        res.redirect('/');
    }
});

app.post('/shortner', async (req, res) => {
    const urlRegex = /^((https?:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?)$/i;
    const rawUrl = req.body.longUrl;

    let isUrlValid = urlRegex.test(rawUrl);

    if (isUrlValid) {
        let shortUrl = generateShortUrl(rawUrl);
        while (await URL.findOne({ shortUrl: shortUrl }).exec() != undefined) {
            shortUrl = generateShortUrl(rawUrl);
        };
    }

    await new URL({ originalUrl: rawUrl, shortUrl: shortUrl }).save();

    req.session.url = shortUrl;

    res.redirect('/');
});

// start
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});