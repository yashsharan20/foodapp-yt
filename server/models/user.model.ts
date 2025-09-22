import mongoose, { Document } from "mongoose";

export interface IUser {
    fullname:string,
    email:string,
    password:string,
    contact:number,
    address:string,
    city:string,
    country:string,
    profilePicture:string,
    admin:boolean,
    lastLogin?:Date,
    isVerified?:boolean,
    resetPasswordToken?:string,
    resetPasswordTokenExpiresAt?:Date,
    verificationToken?:string,
    verificationTokenExpiresAt?:Date
}

export interface IuserDocument extends IUser, Document {
    createdAt:Date,
    updatedAt:Date
}

const userSchema = new mongoose.Schema<IuserDocument>({
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    contact:{type:Number,required:true},
    address:{type:String,default:"Update your address"},
    city:{type:String,default:"Update your city"},
    country:{type:String,default:"Update your country"},
    profilePicture:{
        type:String,
        default:""
    },
    admin:{type:Boolean,default:false},
    lastLogin:{type:Date,default:Date.now},
    isVerified:{type:Boolean,default:false},
    resetPasswordToken:{type:String},
    resetPasswordTokenExpiresAt:{type:Date},
    verificationToken:String,
    verificationTokenExpiresAt:Date
},{timestamps:true});

export const User = mongoose.model("User",userSchema);