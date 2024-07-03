import { Schema } from "mongoose";


export interface IUser{
    login:string;
    password:string;
    active:boolean;
    accesses:number;
}

export const userSchema = new Schema<IUser>({
    login:{
        type:Schema.Types.String,
        required:true
    },
    password:{
        type:Schema.Types.String,
        required:true
    },
    active:{
        type:Schema.Types.Boolean,
        required:false,
        default:true
    },
    accesses:{
        type:Schema.Types.Number,
        required: false,
        default:0
    }
},{
    versionKey:false
});