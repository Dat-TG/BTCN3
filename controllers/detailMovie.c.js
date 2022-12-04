const moviesM=require('../model/movies.m');
const genresM=require('../model/genres.m');
const CastsMovieM=require('../model/CastsMovie.m');
exports.render=async(req,res,next) => {
    try {
        const id=req.params.id;
        const rs=await moviesM.getByID(id);
        const rs1=await genresM.getByIdMovie(id);
        const rs2=await CastsMovieM.getByID(id);
        rs.genres=rs1;
        rs.casts=rs2;
        var display1="d-none";
        var display2="d-block";
        if (!req.session.Username) {
            display2="d-none";
            display1="d-block";
        }
        res.render('detailMovie',{ display1: display1, display2: display2,m:rs });
    } catch(err) {
        console.log(err);
        next(err);
    }
}