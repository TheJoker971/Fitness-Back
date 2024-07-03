import { Schema, Document, model, Model, Types } from 'mongoose';

export interface IUserBadge extends Document {
    userId: Types.ObjectId; 
    badgeId: Types.ObjectId; 
    dateAwarded: Date; 
}

export const userBadgeSchema: Schema<IUserBadge> = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    badgeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Badge', 
        required: true 
    },
    dateAwarded: { 
        type: Date, 
        equired: true, 
        default: Date.now 
    }
}, {
    versionKey: false
});
