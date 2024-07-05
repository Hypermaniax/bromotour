const dashboardAdmin = (req, res) => {
    const session = req.session.admin
    const username = session ? session.username : null
    res.render('dashboard-admin',{
        username: username
    })
}

module.exports = { dashboardAdmin }