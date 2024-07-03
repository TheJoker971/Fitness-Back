import express, { Router, Response, Request } from 'express';
import { BadgeService } from '../services/badge.service';
import { ServiceErrorCode } from '../services/service.result';

export class BadgeController {
    private badgeService: BadgeService;
    private router: Router;

    constructor(badgeService: BadgeService) {
        this.badgeService = badgeService;
        this.router = express.Router();
    }

    async createBadge(req: Request, res: Response) {
        const { name, description, criteria, imageUrl } = req.body;
        const sr = await this.badgeService.create(name, description, criteria, imageUrl);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getAllBadges(req: Request, res: Response) {
        const sr = await this.badgeService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async updateBadge(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, criteria, imageUrl } = req.body;
        const sr = await this.badgeService.update(id, name, description, criteria, imageUrl);
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

    async deleteBadge(req: Request, res: Response) {
        const { id } = req.params;
        const sr = await this.badgeService.delete(id);
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
        this.router.post('/', this.createBadge.bind(this));
        this.router.get('/', this.getAllBadges.bind(this));
        this.router.put('/:id', this.updateBadge.bind(this));
        this.router.delete('/:id', this.deleteBadge.bind(this));
        return this.router;
    }
}
