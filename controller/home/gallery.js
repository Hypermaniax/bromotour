const gallery = ((req,res)=>{
    const session = req.session.user;
    const username = session ? session.username : null;
    res.render('galery',{username:username})
})

module.exports ={ gallery }