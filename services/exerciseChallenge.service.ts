import {Model} from "mongoose";
import {IChallenge, IExerciseChallenge, ModelRegistry} from '../models';
import { ServiceResult } from './service.result';

export class ExerciseChallengeService {

    private exerciseChallengeModel: Model<IExerciseChallenge>;

    constructor(private modelRegistry: ModelRegistry) {
        this.exerciseChallengeModel = modelRegistry.exerciseChallengeModel;
    }

    async create(challengeId:IChallenge, exerciseId:IExerciseChallenge, reps:number, burnedCal:number, duration:number, done?:boolean): Promise<ServiceResult<IExerciseChallenge>> {
        try {
            const exerciseChallenge = (done == true) ? await this.exerciseChallengeModel.create({ challengeId, exerciseId, reps, burnedCal, duration, done }) : await this.exerciseChallengeModel.create({ challengeId, exerciseId, reps, burnedCal, duration});
            return ServiceResult.success(exerciseChallenge);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<IExerciseChallenge[]>> {
        try {
            const exerciseChallenges = await this.exerciseChallengeModel.find().exec();
            return ServiceResult.success(exerciseChallenges);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async update(id:string, exerciseId:IExerciseChallenge, reps:number, burnedCal:number, duration:number, done?:boolean): Promise<ServiceResult<IExerciseChallenge>> {
        try {
            const updatedExerciseChallenge = await this.exerciseChallengeModel.findByIdAndUpdate(
                id,
                { exerciseId, reps, burnedCal, duration, done  },
                { new: true }
            ).exec()
            if (updatedExerciseChallenge) {
                return ServiceResult.success(updatedExerciseChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async delete(id: string): Promise<ServiceResult<IExerciseChallenge>> {
        try {
            const deletedExerciseChallenge = await this.exerciseChallengeModel.findByIdAndDelete(id).exec();
            if (deletedExerciseChallenge) {
                return ServiceResult.success(deletedExerciseChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}