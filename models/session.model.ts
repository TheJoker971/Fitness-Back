import { Schema } from "mongoose";
import {IUser} from "./user.model";


export interface ISession{
    user:string | IUser;
    token:string;
    expiration:Date;
}

export const sessionSchema = new Schema<ISession>({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    token:{
        type:Schema.Types.String,
        required:true
    },
    expiration:{
        type:Schema.Types.Date,
        required:true
    }
},{
    versionKey:false
});