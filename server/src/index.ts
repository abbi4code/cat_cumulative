import express, {Application,Request,Response,NextFunction} from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./routes";
import cors from "cors"
import cookieParser from "cookie-parser"

const app : Application = express();
app.use(cookieParser());
dotenv.config();
const PORT = 3000
const URI: string =
  process.env.DATABASE_URI ||
  "mongodb+srv://abhishek:abhishek@azucation-cat.7ji4yva.mongodb.net/";
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173/",
  })
);

app.use(express.json())


app.use('/api', router)

app.listen(3000,async()=>{
    try {
        await mongoose.connect(URI, {
            dbName:"cs-db"
        }).then(()=> console.log("database connected"))

        console.log(`Backend rnnung on server http://localhost:${PORT}`)

        
    } catch (error) {
       console.log(error)
        console.log("error while connecting to db")

        
    }
})


