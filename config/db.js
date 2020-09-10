const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
console.log(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDb Connected: ${conn.connection.host}`)

    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}


module.exports = connectDB