const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
    console.error('❌ MONGO_CONN environment variable is not set!');
    process.exit(1);
}

mongoose.connect(mongo_url, {
    serverSelectionTimeoutMS: 10000, // timeout after 10s
})
    .then(() => {
        console.log('✅ MongoDB Connected...');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    });
