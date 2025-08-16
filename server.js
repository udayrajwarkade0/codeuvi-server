const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const errorMiddleware = require("./middleware/error-middleware");
const  serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const app = express();

const corsOptions = {
   origin: ["http://localhost:5173", "http://localhost:5174","http://localhost:5175"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,   // note: lowercase 'credentials'
};



app.use(cors(corsOptions));

dotenv.config();


// Middleware
app.use(express.json());


// Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

//let's define admin route
app.use("/api/admin", adminRoute);


// ✅ Global Error Handler (must be after routes)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

console.log("✅ MONGO_URI:", process.env.MONGO_URI);


// Connect DB & Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
