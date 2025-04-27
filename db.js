// const mongoose = require("mongoose");
// const URI = "mongodb://127.0.0.1:27017/menu";

// const connectToMongo = () =>{
//     mongoose.Promise = global.Promise;
//     mongoose.connect(URI)
//     .then(()=>console.log("MongoDB conn"))
//     .catch((err)=>console.log(err));

// }
// module.exports = connectToMongo;const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/menu"; // Local MongoDB URI

const connectToMongo = async () => {
    try {
        // Setting mongoose.Promise to global.Promise
        mongoose.Promise = global.Promise;

        // Connecting to MongoDB
        await mongoose.connect(URI, {
            useNewUrlParser: true, // Optional, but recommended
            useUnifiedTopology: true, // Optional, but recommended
        });

        console.log("✅ MongoDB connected successfully.");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
    }
};

module.exports = connectToMongo;
