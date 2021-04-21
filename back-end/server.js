const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/iheartpoetry', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// import modules and setup API paths
const users = require("./users.js");
app.use("/api/users", users.routes);

const profileImgs = require("./profileimgs.js");
app.use("/api/profileimgs", profileImgs.routes);

const poems = require("./poems.js");
app.use("/api/poems", poems.routes);

app.listen(3001, () => console.log('Server listening on port 3001!'));