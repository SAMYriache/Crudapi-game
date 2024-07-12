const mongoose = require('mongoose');

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectToDB;
