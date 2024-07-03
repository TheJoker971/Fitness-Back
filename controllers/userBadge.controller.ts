import express, { Router, Response, Request } from 'express';
import { UserBadgeService } from '../services/userBadge.service';
import { ServiceErrorCode } from '../services/service.result';

export class UserBadgeController {
    private userBadgeService: UserBadgeService;
    private router: Router;

    constructor(userBadgeService: UserBadgeService) {
        this.userBadgeService = userBadgeService;
        this.router = express.Router();
    }

    async awardBadge(req: Request, res: Response) {
        const { userId, badgeId } = req.body;
        const sr = await this.userBadgeService.awardBadge(userId, badgeId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getUserBadges(req: Request, res: Response) {
        const { userId } = req.params;
        const sr = await this.userBadgeService.getUserBadges(userId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getAllUserBadges(req: Request, res: Response) {
        const sr = await this.userBadgeService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async deleteUserBadge(req: Request, res: Response) {
        const { userBadgeId } = req.params;
        const sr = await this.userBadgeService.deleteUserBadge(userBadgeId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(204).end();
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    buildRoutes(): Router {
        this.router.post('/', this.awardBadge.bind(this));
        this.router.get('/:userId', this.getUserBadges.bind(this));
        this.router.get('/', this.getAllUserBadges.bind(this));
        this.router.delete('/:userBadgeId', this.deleteUserBadge.bind(this));
        return this.router;
    }
}
