const userM=require('../model/user.m');
const FavM=require('../model/favorites.m');
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
        res.render('profile',{u:rs2[0],display1:"d-none",display2:"d-block",ds:FavList});
    } catch(err) {
        next(err);
    }
}