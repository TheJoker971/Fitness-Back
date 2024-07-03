import express, {Router,Response,Request} from 'express';
import {AuthService, SalleService, ServiceErrorCode, UserService} from "../services";
import {IUser} from "../models";
import {SessionMiddleware, UserMiddleware} from "../middlewares";


export class SalleController {

    private salleService : SalleService;
    private router: Router;

    constructor(salleService:SalleService,private authService : AuthService) {
        this.salleService = salleService;
        this.router = express.Router();
    }

    async createSalle(req: Request, res: Response){
        const sr = await this.salleService.create(
            req.body.name,
            req.body.address,
            req.body.description,
            req.body.contact,
            req.body.capacity,
            req.body.activities,
            req.user as IUser
        );
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async editSalle(req:Request,res:Response){
        const sr = await this.salleService.editSalle(req.params.id,req.body);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async deleteSalle(req:Request,res:Response){
        const sr = await this.salleService.deleteSalle(req.params.id);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }
    async getAllSalles(req: Request, res: Response ){
        const sr = await this.salleService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }
    buildRoutes():Router{
        this.router.get('/',this.getAllSalles.bind(this));
        this.router.post('/',express.json(),SessionMiddleware.isLogged(this.authService),UserMiddleware.isOwner(),this.createSalle.bind(this));
        this.router.put('/edit/:id',express.json(),SessionMiddleware.isLogged(this.authService),UserMiddleware.isOwner(),this.editSalle.bind(this));
        this.router.delete('/delete/:id',SessionMiddleware.isLogged(this.authService),UserMiddleware.isOwner(),this.deleteSalle.bind(this));
        return this.router;

    }
}