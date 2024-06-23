import jwt from "jsonwebtoken"
import { Request,Response, NextFunction } from "express"

const authvalidation = async(req:Request,res: Response,next: NextFunction)=>{

    const token = req.headers.authorization
    try {
        if (!token) {
          res.status(404).json({ msg: "token not provided" });
        }
        const headertoken = token?.split(" ")[1];
        console.log(headertoken);
        //@ts-ignore
        const decoded = jwt.verify(headertoken, process.env.JWT_SECRET);
        console.log(decoded)

        if(!decoded){
            return res.json({msg: "invalid token"})
        }
        //@ts-ignore
        req.admin = decoded.admin


        next()

        
    } catch (error) {
        console.log(error)
        res.send("error while verifying tokens")
        
    }
}


export default authvalidation