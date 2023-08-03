const mongoose = require('mongoose');

const connectionString =  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studentsDB";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connect(connectionString, {debug: true});

module.exports = mongoose.connection;