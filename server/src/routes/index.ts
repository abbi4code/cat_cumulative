import express, { Application } from "express"
import userrouter from "./user.route"
import adminrouter from './admin.route'

const router = express.Router()

router.use('/user',userrouter)
router.use('/admin',adminrouter)




export default router