import express from "express"
import dotenv from "dotenv"
import connectDB from "./DB/connectDB";
import userRoute from "./routes/user.route"
import restaurantRoute from "./routes/restaurant.route"
import menuRoute from "./routes/menu.route"
import orderRoute from "./routes/order.route"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

const PORT = 8000

const DIRNAME = path.resolve();

app.use(bodyParser.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit:'10mb'}))
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin:"https://foodapp-yt.onrender.com",
    credentials:true
}
app.use(cors(corsOptions))
app.use("/api/v1/user",userRoute)
app.use("/api/v1/restaurant",restaurantRoute)
app.use("/api/v1/menu",menuRoute)
app.use("/api/v1/order",orderRoute) 

app.use(express.static(path.join(DIRNAME,'/client/dist')));
app.use((_, res) => {
    res.sendFile(path.resolve(DIRNAME, 'client', 'dist', 'index.html'));
});
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
