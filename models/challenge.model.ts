import { Schema, Document, model, Model, Types } from 'mongoose';

export interface IChallenge extends Document {
    name: string;
    description: string;
    equipment: string[];
    difficulty: string;
    type: string;
    salleId: Types.ObjectId; 
    creatorId: Types.ObjectId; 
    //points: number; // Points attribués pour compléter le défi
}

export const challengeSchema: Schema<IChallenge> = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    equipment: [{ 
        type: String, 
        required: true 
    }],
    difficulty: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true },
    salleId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Salle', 
    required: true 
},
    creatorId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    required: true 
},
    /*points: { 
        type: Number, 
        required: true 
    }*/
}, {
    versionKey: false
});