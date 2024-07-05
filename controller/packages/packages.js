const packages = require('../../models/pacakagesModel')

const create = async (req, res) => {
    const formdata = req.body
    const img = req.file

    const CreatePackages = await packages.create({
        via: formdata.via,
        harga: formdata.harga,
        noHp: formdata.nohp,
        foto: img.filename,
        fotourl: '/uploaded-images/' + img.filename,
        rute: [
            formdata.rute_1,
            formdata.rute_2,
            formdata.rute_3,
            formdata.rute_4,
            formdata.rute_5,
        ],
        idvia: req.session.admin._id
    })
    res.json(CreatePackages)
}

module.exports = {
    create
}