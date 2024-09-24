exports.getPageAbout=(req,res)=>{
    res.render('about',{verifUser: req.session.userId,verifType: req.session.type})
}