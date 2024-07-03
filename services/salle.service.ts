import {Model} from "mongoose";
import {ISalle, IUser, ModelRegistry} from "../models";
import {ServiceResult} from "./service.result";

export class SalleService {

    private salleModel: Model<ISalle>;

    constructor(private modelRegistry: ModelRegistry) {
        this.salleModel = modelRegistry.salleModel;
    }

    async deleteSalle(id:string){
        try{
            this.salleModel.findByIdAndDelete(id).exec();
            return ServiceResult.success(undefined);
        }catch(err){
            return ServiceResult.failed();
        }

    }

    async editSalle(id:string,info:any){
        try{
            this.salleModel.findByIdAndUpdate(id,{$set:info}).exec();
            return ServiceResult.success(undefined);
        }catch(err){
            return ServiceResult.failed();
        }

    }

    async create(name:string, address:string, description:string, contact:string[],capacity:number,activities:string[],owner:IUser): Promise<ServiceResult<ISalle>> {
        try {
            console.log(owner);
            const salle = await this.salleModel.create({
                name: name,
                address:address,
                description:description,
                contact:contact,
                capacity:capacity,
                activities:activities,
                owner: owner
            });
            return ServiceResult.success(salle);
        } catch(err) {
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<ISalle[]>> {
        try {
            const salles = await this.salleModel.find().exec();
            return ServiceResult.success(salles);
        } catch(err) {
            return ServiceResult.failed();
        }
    }

    async getById(id: string): Promise<ServiceResult<ISalle>> {
        try {
            const salle = await this.salleModel.findById(id).exec();
            if(salle) {
                return ServiceResult.success(salle);
            }
            return ServiceResult.notFound();
        } catch(err) {
            return ServiceResult.failed();
        }
    }

    async getAllOwner(idUser : string): Promise<ServiceResult<ISalle[]>> {
        try {
            const salles = await this.salleModel.find({
                owner:idUser
            }).exec();
            return ServiceResult.success(salles);
        } catch(err) {
            return ServiceResult.failed();
        }
    }
}