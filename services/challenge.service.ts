import { Model } from 'mongoose';
import { IChallenge, ModelRegistry } from '../models';
import { ServiceResult } from './service.result';

export class ChallengeService {
    private challengeModel: Model<IChallenge>;

    constructor(private modelRegistry: ModelRegistry) {
        this.challengeModel = modelRegistry.challengeModel;
    }

    async create(name: string, description: string, equipment: string[], difficulty: string, type: string, salleId: string, creatorId: string): Promise<ServiceResult<IChallenge>> {
        try {
            const challenge = await this.challengeModel.create({ name, description, equipment, difficulty, type, salleId, creatorId });
            return ServiceResult.success(challenge);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<IChallenge[]>> {
        try {
            const challenges = await this.challengeModel.find().exec();
            return ServiceResult.success(challenges);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getById(id: string): Promise<ServiceResult<IChallenge>> {
        try {
            const challenge = await this.challengeModel.findById(id).exec();
            if (challenge) {
                return ServiceResult.success(challenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async update(id: string, name: string, description: string, equipment: string[], difficulty: string, type: string, points: number): Promise<ServiceResult<IChallenge>> {
        try {
            const updatedChallenge = await this.challengeModel.findByIdAndUpdate(
                id,
                { name, description, equipment, difficulty, type, points },
                { new: true }
            ).exec();
            if (updatedChallenge) {
                return ServiceResult.success(updatedChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async delete(id: string): Promise<ServiceResult<IChallenge>> {
        try {
            const deletedChallenge = await this.challengeModel.findByIdAndDelete(id).exec();
            if (deletedChallenge) {
                return ServiceResult.success(deletedChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}
