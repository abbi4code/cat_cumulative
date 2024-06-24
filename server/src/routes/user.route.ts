import express, {Request,Response} from "express";
import { uservalidation } from "../types";
import User from "../models/user.model";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/signup", async (req : Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const validuser = uservalidation.safeParse({ email, password, name });

    if (!validuser.success) {
      return res.send(validuser.error.errors.map(error => error.message));
    }

    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.json({ msg: "user already exists" });
    }
    const newuser = new User({ email, password, name });
    await newuser.save();
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    
    const token : string = jwt.sign({email}, process.env.JWT_SECRET)
    
    res.cookie("token",token)
    res.status(200).json({msg: "user signup successfully", token})




  } catch (error) {

    console.log(error)

    res.status(404).json({msg: "error while signup"})
  }
});
router.post("/signin", async(req: Request, res: Response) => {
    const { email, password} = req.body;

  try {
    const validuser = uservalidation.safeParse({ email, password});

    if (!validuser.success) {
      return res.send(validuser.error.errors.map(error => error.message));
    }

    const existuser = await User.findOne({ email });
    if (!existuser) {
      return res.json({ msg: "user not exist" });
    }
    
    
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    
    const token : string = jwt.sign({email}, process.env.JWT_SECRET)
    
    res.cookie("token",token)
    res.status(200).json({msg: "user signin successfully", token})
 }catch(error){
    console.log(error)
    res.status(404).json({msg:"error while signin"})
 }


    
  
});

export default router;
