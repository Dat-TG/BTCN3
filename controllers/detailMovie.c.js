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
        res.render('detailMovie',{ display1: "d-none", display2: "d-block",m:rs });
    } catch(err) {
        console.log(err);
        next(err);
    }
}