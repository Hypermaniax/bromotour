const { packages } = require('../../models/pacakagesModel');

const getPackages = async (req, res) => {
    const packagesdb = await packages.find()
    const session = req.session.user;
    const username = session ? session.username : null;
    res.render('packet', {
        packages: packagesdb,
        username: username,
        succeededLog: true
    })
}


module.exports = { getPackages }
