const userM=require('../model/user.m');
exports.render=async(req,res,next)=>{
    if (!req.session.Username) {
        res.redirect('/login');
        return false;
    }
    try {
        const rs2=await userM.getByUsername(req.session.Username);
        res.render('profile',{u:rs2[0],display1:"d-none",display2:"d-block"});
    } catch(err) {
        next(err);
    }
}