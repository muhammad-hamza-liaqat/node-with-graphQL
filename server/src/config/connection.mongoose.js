const mongoose = require("mongoose");

(async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/apollo-demo";
        console.warn(`🔗 Connecting to MongoDB at ${mongoURI}...`);

        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB connected at ${mongoURI}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
})();
