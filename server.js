const hbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const path = require('path');
const { urlencoded } = require('express');
const app = express();
const upload = require('express-fileupload');
const port = 20454;

//Use Session 
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'secret-key-123',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}))

//Use file-upload
app.use(upload());


//Router and model
const moviesM=require('./model/movies.m');
const LoginRouter = require('./routers/login.r');
const RegisterRouter = require('./routers/register.r');
const LogoutRouter = require('./routers/logout.r');
const ProfileRouter = require('./routers/profile.r');
const ImportRouter = require('./routers/import.r');
const DetailMovieRouter=require('./routers/detailMovie.r');


//Use static resources
app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//Template engine
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: [
        path.join(__dirname, '/views/partials')
    ]
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

//Route
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);
app.use('/logout', LogoutRouter);
app.use('/profile', ProfileRouter);
app.use('/import', ImportRouter);
app.use('/movie',DetailMovieRouter);

app.use('/', async (req, res, next) => {
    const rs = await moviesM.getTopRating();
    var arr = [];
    var len = 0;
    var firstThreeMovies=[];
    var trippleMovies=[];
    rs.forEach((item) => {
        arr.push(item);
        len++;
        if (len == 30) {
            return false;
        }
    })
    const movies = arr.map((i) => {
        return {id:i.id, img:i.img,title:i.title,year:i.year,topRank:i.topRank,rating:i.rating,ratingCount:i.ratingCount,synopses:i.synopses};
    });
    firstThreeMovies.push(movies.splice(0, 3));
    for (let i = 0; i < 9; i++) {
        trippleMovies.push(movies.splice(0, 3));
    }
    var isTREmpty="d-none";
    if (firstThreeMovies.length==0) {
        isTREmpty="d-block";
    }
    if (req.session.Username) {
        res.render('home', { display1: "d-none", display2: "d-block",trippleMovies:trippleMovies,firstThreeMovies:firstThreeMovies,isTREmpty:isTREmpty });
    }
    else {
        res.render('home', { display1: "d-block", display2: "d-none",trippleMovies:trippleMovies,firstThreeMovies:firstThreeMovies,isTREmpty:isTREmpty});
    }
});



app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
    res.end();
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})