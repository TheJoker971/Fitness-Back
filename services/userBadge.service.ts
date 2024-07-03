import { Model } from 'mongoose';
import { IUserBadge, ModelRegistry } from '../models';
import { ServiceResult, ServiceErrorCode } from './service.result';

export class UserBadgeService {
    private userBadgeModel: Model<IUserBadge>;

    constructor(private modelRegistry: ModelRegistry) {
        this.userBadgeModel = modelRegistry.userBadgeModel;
    }

    async awardBadge(userId: string, badgeId: string): Promise<ServiceResult<IUserBadge>> {
        try {
            const userBadge = await this.userBadgeModel.create({ userId, badgeId });
            return ServiceResult.success(userBadge);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getUserBadges(userId: string): Promise<ServiceResult<IUserBadge[]>> {
        try {
            const userBadges = await this.userBadgeModel.find({ userId }).populate('badgeId').exec();
            return ServiceResult.success(userBadges);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<IUserBadge[]>> {
        try {
            const userBadges = await this.userBadgeModel.find().populate('badgeId').exec();
            return ServiceResult.success(userBadges);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async deleteUserBadge(userBadgeId: string): Promise<ServiceResult<IUserBadge>> {
        try {
            const userBadge = await this.userBadgeModel.findByIdAndDelete(userBadgeId).exec();
            if (userBadge) {
                return ServiceResult.success(userBadge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}
