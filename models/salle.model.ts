import {Schema} from 'mongoose'
import {IUser} from "./user.model";
export interface ISalle {
    name: string;
    address:string;
    description:string;
    contact:string[];
    capacity:number;
    activities:string[];
    owner:IUser;
}

export const salleSchema = new Schema<ISalle>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    address: {
        type:Schema.Types.String,
        required:true
    },
    description: {
        type:Schema.Types.String,
        required: true
    },
    contact:{
        type:[Schema.Types.String],
        required:true
    },
    capacity:{
        type:Schema.Types.Number,
        requied:true
    },
    activities:{
        type:[Schema.Types.String],
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        required : true
    }

},{
    versionKey: false
});