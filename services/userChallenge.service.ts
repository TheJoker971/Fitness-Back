import { Model } from 'mongoose';
import { IUserChallenge, ModelRegistry } from '../models';
import { ServiceResult, ServiceErrorCode } from './service.result';

export class UserChallengeService {
    private userChallengeModel: Model<IUserChallenge>;

    constructor(private modelRegistry: ModelRegistry) {
        this.userChallengeModel = modelRegistry.userChallengeModel;
    }

    async startChallenge(userId: string, challengeId: string): Promise<ServiceResult<IUserChallenge>> {
        try {
            const userChallenge = await this.userChallengeModel.create({ userId, challengeId });
            return ServiceResult.success(userChallenge);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getUserChallenges(userId: string): Promise<ServiceResult<IUserChallenge[]>> {
        try {
            const userChallenges = await this.userChallengeModel.find({ userId }).populate('challengeId').exec();
            return ServiceResult.success(userChallenges);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<IUserChallenge[]>> {
        try {
            const userChallenges = await this.userChallengeModel.find().populate('challengeId').exec();
            return ServiceResult.success(userChallenges);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async updateProgress(userId: string, challengeId: string, progress: number): Promise<ServiceResult<IUserChallenge>> {
        try {
            const userChallenge = await this.userChallengeModel.findOneAndUpdate(
                { userId, challengeId },
                { progress, status: progress >= 100 ? 'complété' : 'en cours', dateCompleted: progress >= 100 ? new Date() : null },
                { new: true }
            ).exec();
            if (userChallenge) {
                return ServiceResult.success(userChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async deleteUserChallenge(userChallengeId: string): Promise<ServiceResult<IUserChallenge>> {
        try {
            const userChallenge = await this.userChallengeModel.findByIdAndDelete(userChallengeId).exec();
            if (userChallenge) {
                return ServiceResult.success(userChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}
