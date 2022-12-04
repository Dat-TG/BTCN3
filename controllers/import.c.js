const userM = require('../model/user.m');
const castsM = require('../model/casts.m');
const CastsMovieM = require('../model/CastsMovie.m');
const genresM = require('../model/genres.m');
const moviesM = require('../model/movies.m');
const reviewsM = require('../model/reviews.m');
exports.import = async (req, res, next) => {
    if (!req.session.Username) {
        res.render('login',{errWrongPassword:"none",errWrongUsername:"none",display1:"d-block",display2:"d-none"});
        return false;
    }
    try {
        var movies = JSON.parse(req.files.FileMovies.data.toString('utf8'));
        var casts = JSON.parse(req.files.FileCasts.data.toString('utf8'));
        await CastsMovieM.deleteAll();
        await castsM.deleteAll();
        await genresM.deleteAll();
        await reviewsM.deleteAll();
        await moviesM.deleteAll();
        const IDM=movies.map(i=>i.id);
        movies=movies.filter(({id}, index) => !IDM.includes(id, index + 1));
        const IDC=casts.map(i=>i.id);
        casts=casts.filter(({id}, index) => !IDC.includes(id, index + 1));
        for (let i = 0; i < casts.length; i++) {
            var timestamp = Date.parse(casts[i].birthDate);
            if (isNaN(timestamp) == false) {
                casts[i].birthDate = new Date(timestamp);
            } else {
                casts[i].birthDate = null;
            }
            await castsM.add(casts[i]);
        }
        for (let i = 0; i < movies.length; i++) {
            var data={};
            data.id = movies[i].id;
            data.img = movies[i].img;
            data.title = movies[i].title;
            data.year = movies[i].year;
            data.topRank = movies[i].topRank;
            data.rating = movies[i].rating;
            data.ratingCount = movies[i].ratingCount;
            if (movies[i].synopses!=undefined) data.synopses = movies[i].synopses.text;
            await moviesM.add(data);
            for (let j = 0; j < movies[i].genres.length; j++) {
                let data2={};
                data2.idMovie = movies[i].id;
                data2.genres=movies[i].genres[j];
                await genresM.add(data2);
            }
            var data3 = movies[i].casts;
            for (let j = 0; j < data3.length; j++) {
                data3[j].idMovie = movies[i].id;
                await CastsMovieM.add(data3[j]);
            }
            var data4 = movies[i].reviews;
            for (let j = 0; j < data4.length; j++) {
                data4[j].idMovie = movies[i].id;
                await reviewsM.add(data4[j]);
            }
        }
        res.redirect('/')
    } catch (err) {
        console.log(err);
        next(err);
    }
}