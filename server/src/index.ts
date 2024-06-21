import express, {Application,Request,Response,NextFunction} from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"

const app : Application = express();
dotenv.config();
const PORT = 3000
const URI : string = process.env.DATABASE_URI || "mongodb://localhost:27018/"


app.use(express.json())

app.listen(3000,async()=>{
    try {
        await mongoose.connect(URI, {
            dbName:"cs-db"
        }).then(()=> console.log("database connected"))

        console.log(`Backend rnnung on server http://localhost:${PORT}`)

        
    } catch (error) {
        console.log("error while connecting to db")

        
    }
})


