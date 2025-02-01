import express from "express";
import dotenv from "dotenv"
import connectDB from "./Utils/dbConnection.js";
import authRoutes from "./Routes/auth.routes.js"
import cors from 'cors'

dotenv.config()



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    // allowedHeaders: 'Content-Type,Authorization'
}));

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)

})

connectDB();

app.get("/", (req, res) => {
    res.send("Welcome!! You are on home screen")
})


app.use("/api/auth", authRoutes);