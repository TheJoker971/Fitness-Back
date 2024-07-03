import {IChallenge} from "./challenge.model";
import {IExerciseType} from "./exerciseType.model";
import {Schema} from "mongoose";

export interface IExerciseChallenge {
    challengeId:IChallenge;
    exerciseId:IExerciseType;
    reps:number;
    burnedCal:number;
    duration:number;
    done?:boolean;
}

export const exerciseChallengeSchema : Schema<IExerciseChallenge> = new Schema({
    challengeId: {
        type: Schema.Types.ObjectId,
        ref:"Challenge",
        required:true
    },
    exerciseId: {
        type: Schema.Types.ObjectId,
        ref:"ExerciseTypes",
        required: true
    },
    reps: {
        type: Schema.Types.Number,
        required: true
    },
    burnedCal: {
        type: Schema.Types.Number,
        required: true
    },
    duration: {
        type: Schema.Types.Number,
        required: true
    },
    done: {
        type: Schema.Types.Boolean,
        required: false,
        default: false
    }
},{
    versionKey: false
});