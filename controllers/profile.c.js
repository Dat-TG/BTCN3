const userM=require('../model/user.m');
const FavM=require('../model/favorites.m');
const FavMovieM = require('../model/FavMovie.m');
const moviesM = require('../model/movies.m');
exports.render=async(req,res,next)=>{
    if (!req.session.Username) {
        res.redirect('/login');
        return false;
    }
    try {
        const rs2=await userM.getByUsername(req.session.Username);
        var FavList=await FavM.getAll(req.session.Username);
        if (FavList.length==0) {
            FavList.push({"Listname":"You don't have any favorite lists. Create one first."});
        }
        var list=[];
        for (let k=0;k<FavList.length;k++) {
            FavList[k].movies=[];
        }
        var k=-1;
        FavList.forEach(async (element, index, array) => {
            k++;
            var temp = await FavMovieM.getAll(req.session.Username,FavList[k].Listname);
            var movies=[];
            temp.forEach(async(element,index,array)=>{
                const temp2=await moviesM.getByID(element.idMovie);
                movies.push(temp2);
                if (index==array.length-1) {
                    var tmp=[];
                    movies.forEach((i)=>{
                        tmp.push(i);
                        if (tmp.length==6) {
                            FavList[k].movies.push(tmp);
                            tmp=[];
                        }
                    })
                    if (tmp.length<6 && tmp.length>0) {
                        FavList[k].movies.push(tmp);
                    }
                    res.render('profile',{u:rs2[0],display1:"d-none",display2:"d-block",ds:FavList});
                }
            });
        });
    } catch(err) {
        next(err);
    }
}