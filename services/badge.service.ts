import { Model } from 'mongoose';
import { IBadge, ModelRegistry } from '../models';
import { ServiceResult, ServiceErrorCode } from './service.result';

export class BadgeService {
    private badgeModel: Model<IBadge>;

    constructor(private modelRegistry: ModelRegistry) {
        this.badgeModel = modelRegistry.badgeModel;
    }

    async create(name: string, description: string, criteria: string, imageUrl: string): Promise<ServiceResult<IBadge>> {
        try {
            const badge = await this.badgeModel.create({ name, description, criteria, imageUrl });
            return ServiceResult.success(badge);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<IBadge[]>> {
        try {
            const badges = await this.badgeModel.find().exec();
            return ServiceResult.success(badges);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async update(id: string, name: string, description: string, criteria: string, imageUrl: string): Promise<ServiceResult<IBadge>> {
        try {
            const updatedBadge = await this.badgeModel.findByIdAndUpdate(
                id, 
                { name, description, criteria, imageUrl }, 
                { new: true }
            ).exec();
            if (updatedBadge) {
                return ServiceResult.success(updatedBadge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async delete(id: string): Promise<ServiceResult<IBadge>> {
        try {
            const deletedBadge = await this.badgeModel.findByIdAndDelete(id).exec();
            if (deletedBadge) {
                return ServiceResult.success(deletedBadge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}
