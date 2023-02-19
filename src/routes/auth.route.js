import { Router } from "express";
import validationSchema from '../validation/userschema.validation.js'
import createError from 'http-errors'
import User from "../models/user.model.js";

const {userAuthSchema} = validationSchema
const router = Router();

router.post("/register", async (req, res, next) => {
  console.log(req.body)
  try{
    const {email, password} = req.body
    if(!email || !password){
      throw createError.BadRequest()
    }
    const doesExists = await User.findOne({email: email, password: password})
    if(doesExists) {
      throw createError.Conflict(`${email} is an existing user`)
    }

    const user = new User({email: email, password: password})
    const savedUser = await user.save()
    res.send(savedUser)
  }
  catch(error){
    next(error)
  }
  
});
router.post("/login", async (req, res, next) => {
  res.send("login route");
});
router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh-token route");
});
router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

export default router;
