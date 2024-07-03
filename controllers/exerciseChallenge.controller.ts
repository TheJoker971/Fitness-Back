import express, { Router, Response, Request } from 'express';
import {ChallengeService, ExerciseChallengeService, ServiceErrorCode} from '../services';
import {IChallenge, ModelRegistry} from "../models";



export class ExerciseChallengeController {

    private exerciseChallengeService: ExerciseChallengeService;
    private router: Router;

    constructor(private registry: ModelRegistry, exerciseChallengeService: ExerciseChallengeService) {
        this.exerciseChallengeService = exerciseChallengeService;
        this.router = express.Router();
    }

    async createExerciseChallenge(req: Request, res: Response) {
        const { exerciseId, reps, burnedCal, duration} = req.body;
        const {idChallenge} = req.params;
        const challengeId = await new ChallengeService(this.registry).getById(idChallenge);
        const sr = await this.exerciseChallengeService.create(challengeId.result as IChallenge, exerciseId, reps, burnedCal, duration);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getAllExerciseChallenge(req: Request, res: Response) {
        const sr = await this.exerciseChallengeService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async updateExerciseChallenge(req: Request, res: Response) {
        const { id } = req.params;
        const { exerciseId, reps, burnedCal, duration, done } = req.body;
        const sr = await this.exerciseChallengeService.update(id, exerciseId, reps, burnedCal, duration, done);
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

    async deleteExerciseChallenge(req: Request, res: Response) {
        const { id } = req.params;
        const sr = await this.exerciseChallengeService.delete(id);
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
        this.router.post('/:idChallenge', express.json(), this.createExerciseChallenge.bind(this));
        this.router.get('/', this.getAllExerciseChallenge.bind(this));
        this.router.put('/:id', this.updateExerciseChallenge.bind(this));
        this.router.delete('/:id', this.deleteExerciseChallenge.bind(this));
        return this.router;
    }
}
