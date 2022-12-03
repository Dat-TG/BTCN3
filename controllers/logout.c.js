exports.logout=async(req, res, next)=>{
    try {
        req.session.Username=null;
        res.redirect('/login');
    } catch (err) {
        next(err);
    }
}