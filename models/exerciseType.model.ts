import {Schema} from 'mongoose'

export interface IExerciseType {
    name: string;
    description: string;
    targetedMuscles: string[]
}

export const exerciseTypeSchema = new Schema<IExerciseType>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    description: {
        type:Schema.Types.String,
        required:true
    },
    targetedMuscles: {
        type:[Schema.Types.String],
        required: true
    }
},{
    versionKey: false
});