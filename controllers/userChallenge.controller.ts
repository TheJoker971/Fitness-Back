import express, { Router, Response, Request } from 'express';
import { UserChallengeService } from '../services/userChallenge.service';
import { ServiceErrorCode } from '../services/service.result';

export class UserChallengeController {
    private userChallengeService: UserChallengeService;
    private router: Router;

    constructor(userChallengeService: UserChallengeService) {
        this.userChallengeService = userChallengeService;
        this.router = express.Router();
    }

    async startChallenge(req: Request, res: Response) {
        const { userId, challengeId } = req.body;
        const sr = await this.userChallengeService.startChallenge(userId, challengeId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getUserChallenges(req: Request, res: Response) {
        const { userId } = req.params;
        const sr = await this.userChallengeService.getUserChallenges(userId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getAllUserChallenges(req: Request, res: Response) {
        const sr = await this.userChallengeService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async updateProgress(req: Request, res: Response) {
        const { userId, challengeId } = req.params;
        const { progress } = req.body;
        const sr = await this.userChallengeService.updateProgress(userId, challengeId, progress);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async deleteUserChallenge(req: Request, res: Response) {
        const { userChallengeId } = req.params;
        const sr = await this.userChallengeService.deleteUserChallenge(userChallengeId);
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
        this.router.post('/', this.startChallenge.bind(this));
        this.router.get('/:userId', this.getUserChallenges.bind(this));
        this.router.get('/', this.getAllUserChallenges.bind(this));
        this.router.put('/:userId/:challengeId', this.updateProgress.bind(this));
        this.router.delete('/:userChallengeId', this.deleteUserChallenge.bind(this));
        return this.router;
    }
}
