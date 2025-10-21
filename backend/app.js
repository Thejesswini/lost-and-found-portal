const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

const authRoutes = require("./routes/auth");
const {verifyToken} = require("./middleware/auth-middleware");

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("server is up");
});

app.use(cors());
app.use("/auth", authRoutes);

async function connectDb(){
    await mongoose.connect("mongodb://localhost:27017",{
        dbName: "lost-and-found-db"
    });
    console.log("mongo DB connected");
}

connectDb().catch((err)=>{
    console.error(err);
})

app.listen(port, ()=>{
    console.log("server running", port)
});