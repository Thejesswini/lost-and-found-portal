const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/user');
const tagRoutes = require('./routes/tagRoutes');

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/user", userRoutes);
app.use("/tags", tagRoutes); // Only this should handle /tags

// MongoDB Connection
async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "lost-and-found-db"
  });
  console.log("MongoDB connected");
}
connectDb().catch(err => console.error(err));

// Default route
app.get('/', (req, res) => res.send('Backend is running!'));

// Start Server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
