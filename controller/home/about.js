const about = ((req, res) => {
    const session = req.session.user;
    const username = session ? session.username : null;
    res.render('about', { username: username })
})

module.exports = { about }