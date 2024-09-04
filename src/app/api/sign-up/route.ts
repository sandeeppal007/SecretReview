import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"

import { sendVerification } from "@/helpers/sendVerificationEmail";
import mongoose from "mongoose";




export async function POST(request:Request){
    await dbConnect()
    try {
        
      const {username,email,password} = await request.json();

      const extingUseVerifiedByUsername =  await UserModel.findOne({username,isVerified:true})

      if(extingUseVerifiedByUsername){
        return Response.json({success:false,message:"Username is already taken"},{status:400,})
      }



    const extingUserByEmail = await  UserModel.findOne({email})

    const verifyCode = Math.floor(10000+Math.random()*999999).toString();




    if(extingUserByEmail){
     
        if(extingUserByEmail.isVerified){
        return Response.json({
            success:false,
            message:"User name already exsit with this email"
        },{status:400})
        }else{
            const hashesPassowrd = await bcrypt.hash(password,10);
            extingUserByEmail.password = hashesPassowrd;
            extingUserByEmail.verifyCode = verifyCode;
            extingUserByEmail.verifyCodeExpired = new Date(Date.now() + 3600000)

            await extingUserByEmail.save();
        }
    }else{
      const hashesPassowrd = await bcrypt.hash(password,10)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours()+1)

   const newUser = await  new UserModel({
        username,
        email,
        password:hashesPassowrd,
        verifyCode,
        verifyCodeExpired:expiryDate,
        isVerified:false,
        isAcceptingMessage:true,
        messages:[]
      })



      await newUser.save();
    }


    // send verification email


    const emailResponse = await sendVerification(email,username,password);

    if(!emailResponse.success){
        return Response.json({
            success:false,
            message:emailResponse.message
        },{status:500})


    }

    return Response.json({
        success:true,
        message:"User registred succesfully. please verify your email"
    },{status:201})


    console.log(emailResponse)



    } catch (error) {
        console.log("error register user",error)

        return Response.json({
            success:false,
            message:"Error registering user"
        },{
            status:500
        }
    )
    }
}