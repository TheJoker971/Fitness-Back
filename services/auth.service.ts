import {ISession, IUser, ModelRegistry, userSchema} from "../models";
import mongoose, {Model} from "mongoose";
import {ServiceResult} from "./service.result";
import {SecurityUtils} from "../utils";

export class AuthService {

    private userModel: Model<IUser>;
    private sessionModel: Model<ISession>;

    constructor(private modelRegistry: ModelRegistry) {
        this.userModel = modelRegistry.userModel;
        this.sessionModel = modelRegistry.sessionModel;
    }

    async subscribe(login: string, password: string): Promise<ServiceResult<ISession>> {
        try {
            const user = await this.userModel.create({
                login: login,
                password: SecurityUtils.toSHA256(password)
            });
            const connect = await this.log(login,password);
            return connect;
        } catch(err) {
            const errDict = err as {[key: string]: unknown};
            if(errDict['name'] === 'MongoServerError' && errDict['code'] === 11000) {
                // duplicate login
                return ServiceResult.conflict();
            } else {
                return ServiceResult.failed();
            }
        }
    }

    async log(login: string, password: string): Promise<ServiceResult<ISession>> {
        try{
            const user = await this.userModel.findOne({
                login:login,
                password:SecurityUtils.toSHA256(password)
            }).exec();
            if(user !== null ){
                if(!user.active){
                    return ServiceResult.failed();
                }
                let expiration = new Date().getTime() + 1800000;
                let session = await this.sessionModel.findOne({
                    user:user
                }).populate('user').exec();
                if(session !== null){
                    if(session.expiration.getTime() < new Date().getTime()){
                        const update = await this.sessionModel.updateOne({
                            _id:session
                        },{
                            $set:{
                                token:SecurityUtils.randomToken(),
                                expiration:expiration
                            }
                        }).populate('user').exec();

                    }
                    return ServiceResult.success(session);
                }else {
                    session = await this.sessionModel.create({
                        user:user,
                        token:SecurityUtils.randomToken(),
                        expiration: expiration
                    });
                    return ServiceResult.success(session);
                }
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async getSession(token: string): Promise<ServiceResult<ISession>> {
        try {
            const session = await this.sessionModel.findOne({
                token: token,
                expiration: {
                    $gt: new Date()
                }
            }).populate('user').exec();
            if(session !== null) {
                console.log("Parfait");
                return ServiceResult.success(session);
            }
            console.log(session);
            console.log("session : null");
            return ServiceResult.notFound();
        } catch(err) {
            console.error("Error caught in catch block:", err);
            return ServiceResult.failed();
        }
    }
}