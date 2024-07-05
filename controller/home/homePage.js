const { packages } = require('../../models/pacakagesModel')
const homepage = async (req, res) => {
    const getallPackages = await packages.find()
    const session = req.session.user;
    const username = session ? session.username : null;
    res.render('index', {
        packages: getallPackages,
        username: username,
        succeededLog: true
    })
}
module.exports = { homepage }