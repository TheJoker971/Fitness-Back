import { Schema, Document, model, Model, Types } from 'mongoose';

export interface IUserChallenge extends Document {
    userId: Types.ObjectId; // Référence à l'utilisateur
    challengeId: Types.ObjectId; // Référence au défi
    status: string; // Statut de progression du défi ("en cours", "complété")
    progress: number; // Progression actuelle en pourcentage
    dateStarted: Date; // Date de début du défi
    dateCompleted?: Date; // Date de fin du défi (si terminé)
}

export const userChallengeSchema: Schema<IUserChallenge> = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    required: true 
},
    challengeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Challenge', 
    required: true 
},
    status: { 
        type: String, 
        required: true, 
        enum: ['en cours', 'complété'], 
    default: 'en cours' },
    progress: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    dateStarted: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    dateCompleted: { 
        type: Date 
    }
}, {
    versionKey: false
});
