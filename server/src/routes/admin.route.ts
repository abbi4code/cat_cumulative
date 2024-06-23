import express from "express"
import Admin from "../models/admin.model"
import jwt from "jsonwebtoken"
import adminvalidation from "../middlewares/auth.middleware";
import Clgscore from "../models/college.model";

const router = express.Router()


router.post('/signin',async(req,res)=>{
    const username :string = req.body.username
    const password :string = req.body.password

   try {
    const existuser = await Admin.findOne({username,password})
    if(!existuser){
        return res.json({msg: "admin account not exist with the input provided"})
    }
    const options= {
        httponly: true,
        secure: true
    }
    const admin = existuser._id
    //@ts-ignore
    const token: string = jwt.sign({ admin }, process.env.JWT_SECRET);
    res.cookie("accesstoken", token,options)
    
    res.status(200).json({ msg: "admin logged-in successfully", token });
    
   } catch (error) {
    console.log(error)
    res.json({msg: "error while admin signin"})
    
   }


})

router.post('/create',adminvalidation,async(req,res)=>{
    const details = req.body 

    try {
        const clgexist = await Clgscore.findOne({clgname: details.clgname})
        if(clgexist){
            return res.json({msg: "clg already in the db"})
        }
        //@ts-ignore
        const info = req.admin
        console.log(info)
        const admin = await Admin.findOne({_id: info})
        console.log(admin)
        const newclg = new Clgscore({clgname: details.clgname, compositescore: details.compositescore,DILR_percentile: details.DILR_percentile, QA_percentile: details.QA_percentile, overall_percentile: details.overall_percentile,VARC_percentile: details.VARC_percentile})
        await newclg.save()

        res.status(200).json({msg: "clg successfully saved in db"})
    } catch (error) {

        console.log(error)
        res.status(404).json({msg: "error while creating clg db"})
        
    }

})



export default router