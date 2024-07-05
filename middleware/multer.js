const multer = require('multer')
const path = require('path')
const uploadMiddleware = multer({
    // middleware multer nya pakai storage disk
    storage: multer.diskStorage({
        // buat function yang return destinasi tempat simpan
        // di simpan di public biar bisa di akses
        destination: function (req, file, cb) {
            // cb(null, __dirname + '/../public/uploaded-images')
            cb(null, path.resolve(__dirname, '../public/uploaded-images'))
        },
        // set nama file yg di simpan di public/uploaded-images
        // namnya jadi ${epochtimenumeric}.extensionlama
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
})

module.exports = {
    uploadMiddleware
}