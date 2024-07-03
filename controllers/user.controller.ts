import express, {Router,Request,Response} from 'express';
import {UserMiddleware} from "../middlewares";
import {AuthService, ServiceErrorCode, UserService} from "../services";
import {SessionMiddleware} from "../middlewares/session.middleware";


export class UserController{

    private router :Router;
    constructor(private authService: AuthService,private userService:UserService){
        this.router = express.Router();
    }


    async editUser(req:Request,res:Response){
        const sr = await this.userService.editUser(req.params.id,req.body);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async deleteUser(req:Request,res:Response){
        const sr = await this.userService.deleteUser(req.params.id);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }
    async getUsers(req:Request,res:Response){
        const sr = await this.userService.getAll();
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
        }
    }

    buildRoutes(){
        this.router.put('/edit/:id',express.json(),SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.editUser.bind(this));
        this.router.delete('/delete/:id',SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.deleteUser.bind(this));
        this.router.get('/',this.getUsers.bind(this));
        return this.router;
    }
}