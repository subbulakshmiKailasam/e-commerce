import express from 'express';
import { userModule } from '../controller/user.controller';


const app = express();
export const userrouter = express.Router()

userrouter.post('/createUser',function(req,res,next){
    userModule.createUser(req,res,next)
})

userrouter.get('/loginUser',function(req,res,next){
    console.log(req.body)
    userModule.loginUser(req,res,next)
})
