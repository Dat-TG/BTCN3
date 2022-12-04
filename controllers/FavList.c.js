const userM = require('../model/user.m');
const castsM = require('../model/casts.m');
const CastsMovieM = require('../model/CastsMovie.m');
const genresM = require('../model/genres.m');
const moviesM = require('../model/movies.m');
const reviewsM = require('../model/reviews.m');
const FavM=require('../model/favorites.m');
exports.add = async (req, res, next) => {
    if (!req.session.Username) {
        res.render('login',{errWrongPassword:"none",errWrongUsername:"none",display1:"d-block",display2:"d-none"});
        return false;
    }
    try {
        var Username=req.session.Username;
        var Listname=req.body.name;
        await FavM.add(Username,Listname);
        res.redirect('/profile');
    } catch (err) {
        next(err);
    }
}
exports.rename=async(req,res,next)=>{
    if (!req.session.Username) {
        res.render('login',{errWrongPassword:"none",errWrongUsername:"none",display1:"d-block",display2:"d-none"});
        return false;
    }
    try {
        var Username=req.session.Username;
        var Listname=req.body.nameRe;
        var old=req.params.old;
        await FavM.update(Username,old,Listname);
        res.redirect('/profile');
    } catch (err) {
        next(err);
    }
}
exports.deleteFav = async (req, res, next) => {
    if (!req.session.Username) {
        res.redirect('/login');
        return false;
    }
    try {
        await FavMovieM.deleteAll();
        await FavListM.deleteAll();
        res.redirect('/profile');
    } catch (err) {
        next(err);
    }
}