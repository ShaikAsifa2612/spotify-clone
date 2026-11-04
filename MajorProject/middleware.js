module.exports.isLoggedIn = (req,res,next)=>{   
console.log(req.path,"..",req.originalUrl);
if(!req.isAuthenticated()){
    // if user is  logged in - there is no use of storing the originalUrl
    // if user is not logged in - there we should store Originalurl 
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must be logged in to create listing");
     return res.redirect("/login");
  }
}

module.exports.savedRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();


};