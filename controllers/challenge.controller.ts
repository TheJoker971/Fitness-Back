import express, { Router, Response, Request } from 'express';
import {ChallengeService, ServiceErrorCode} from "../services";


export class ChallengeController {
    private challengeService: ChallengeService;
    private router: Router;

    constructor(challengeService: ChallengeService) {
        this.challengeService = challengeService;
        this.router = express.Router();
    }

    async createChallenge(req: Request, res: Response) {
        const { name, description, equipment, difficulty, type, salleId, creatorId} = req.body;
        const sr = await this.challengeService.create(name, description, equipment, difficulty, type, salleId, creatorId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getAllChallenges(req: Request, res: Response) {
        const sr = await this.challengeService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getChallengeById(req: Request, res: Response) {
        const { id } = req.params;
        const sr = await this.challengeService.getById(id);
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

    async updateChallenge(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, equipment, difficulty, type, points } = req.body;
        const sr = await this.challengeService.update(id, name, description, equipment, difficulty, type, points);
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

    async deleteChallenge(req: Request, res: Response) {
        const { id } = req.params;
        const sr = await this.challengeService.delete(id);
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
        this.router.post('/', this.createChallenge.bind(this));
        this.router.get('/', this.getAllChallenges.bind(this));
        this.router.get('/:id', this.getChallengeById.bind(this));
        this.router.put('/:id', this.updateChallenge.bind(this));
        this.router.delete('/:id', this.deleteChallenge.bind(this));
        return this.router;
    }
}
