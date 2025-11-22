const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const multer = require('multer');
//const Item = require('./models/Item');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const authRoutes = require("./routes/auth");
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/user');

const {verifyToken} = require("./middleware/auth-middleware");

app.use('/items', itemRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/lostfound', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

async function connectDb(){
    await mongoose.connect("mongodb://localhost:27017",{
        dbName: "lost-and-found-db"
    });
    console.log("mongo DB connected");
}

connectDb().catch((err)=>{
    console.error(err);
})

// Default route
app.get('/', (req, res) => res.send('Backend is running!'));

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
