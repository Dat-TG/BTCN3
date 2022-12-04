const moviesM = require('../model/movies.m');
const CastsMovieM = require('../model/CastsMovie.m');
const CastsM = require('../model/casts.m');
const asyncTimeout =(timeout)=> new Promise(res => setTimeout(res, timeout));
exports.render = async (req, res, next) => {
    try {
        const id = req.params.id;
        var display1 = "d-none";
        var display2 = "d-block";
        if (!req.session.Username) {
            display2 = "d-none";
            display1 = "d-block";
        }
        var rs = await CastsM.getByID(id);
        if (rs.length == 0 || rs[0].name==null) {
            res.render('detailCast', { display1: display1, display2: display2, Fcast: "d-none" });
            return false;
        }
        const rs1 = await CastsMovieM.getByCastID(id);
        var movies=[];
        rs[0].movies=[];
        rs1.forEach(async (element, index, array) => {
            const temp = await moviesM.getByID(element.idMovie);
            movies.push(temp);
            if (index==array.length-1) {
                var tmp=[];
                movies.forEach((i)=>{
                    tmp.push(i);
                    if (tmp.length==4) {
                        rs[0].movies.push(tmp);
                        tmp=[];
                    }
                })
                if (tmp.length<4 && tmp.length>0) {
                    rs[0].movies.push(tmp);
                }
                res.render('detailCast', { display1: display1, display2: display2, c: rs[0], NFcast: "d-none" });
            }
        });
    } catch (err) {
        next(err);
    }
}