const userM=require('../model/user.m');
const CryptoJS=require('crypto-js');
const hashLength=64;
exports.render= async(req, res, next) =>{
    try {
        res.render('register', {display:"d-none",display1:"d-block",display2:"d-none"});
    } catch(err) {
        next(err);
    }
}
exports.writeDB=async(req, res, next)=>{
    try {
        var user=req.body;
        const pw=user.password;
        const salt=Date.now().toString(16);
        const pwSalt=user.password+salt;
        const pwHashed=CryptoJS.SHA3(pwSalt, {outputLength:hashLength*4}).toString(CryptoJS.enc.Hex);
        user.password=pwHashed+salt;
        userM.getByUsername(user).then(rs=>{
            if (rs.length==0) {
                userM.add(user);
                res.redirect('/');
            }
            else {
                user.password=pw;
                res.render('register',{data:user, display: "block",display1:"d-block",display2:"d-none"});
            }
        })
    } catch(err) {
        next(err);
    }
};