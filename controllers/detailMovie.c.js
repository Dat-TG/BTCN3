const moviesM = require('../model/movies.m');
const genresM = require('../model/genres.m');
const CastsMovieM = require('../model/CastsMovie.m');
const FavListM = require('../model/favorites.m');
const FavMovieM = require('../model/FavMovie.m');
exports.render = async (req, res, next) => {
    try {
        const id = req.params.id;
        const rs = await moviesM.getByID(id);
        const rs1 = await genresM.getByIdMovie(id);
        const rs2 = await CastsMovieM.getByID(id);
        const list = await FavListM.getAll(req.session.Username);
        rs.genres = rs1;
        rs.casts = rs2;
        var display1 = "d-none";
        var display2 = "d-block";
        if (!req.session.Username) {
            display2 = "d-none";
            display1 = "d-block";
        }
        res.render('detailMovie', { display1: display1, display2: display2, m: rs, list: list });
    } catch (err) {
        next(err);
    }
}
exports.addFav = async (req, res, next) => {
    if (!req.session.Username) {
        res.redirect('/login');
        return false;
    }
    try {
        var listname = req.body.ListName;
        var id = req.params.id;
        const rs = await FavMovieM.getByID(req.session.Username, listname, id);
        if (rs.length == 0 && listname!=null) {
            await FavMovieM.add(req.session.Username, listname, id);
        }
        res.redirect('/movie/' + id);
    } catch (err) {
        next(err);
    }
}