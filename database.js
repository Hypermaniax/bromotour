const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connect = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect }