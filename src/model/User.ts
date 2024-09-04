import mongoose, {Schema,Document, Mongoose} from "mongoose";


export interface Message extends Document{
    content:string;
    createdAt:Date;
}
export interface User extends Document{
   username:string;
   email:string;
   password:string;
   verifyCode:string;
   verifyCodeExpired:Date;
   isVerified:boolean;
   isAcceptingMessage:boolean;
   messages:Message[];

}


const MessageSchema:Schema<Message> = new Schema({
content:{
    type:String,
    required:true,
},
createdAt:{
    type:Date,
    required:true,
    default:Date.now,
}


})

const UserSchema:Schema<User> = new Schema({

    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email"],

       
    },
    password:{
        type:String,
        required:true,
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"],
    },
    verifyCodeExpired:{
        type:Date,
        required:[true,"Verify code expired is required"],
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    messages:[MessageSchema]
    
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("UserSchema")


export default UserModel

