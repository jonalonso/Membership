import { Context, Next } from 'koa';
import httpStatus from '../../consts/httpStatusCodes';
import { User } from '../../database/entities/User';
import { BaseController } from '../base.controller';

export class UserController extends BaseController {
    constructor(){
        super();
    }

    async getUser(ctx:Context, next: Next) {
        return super.getAll(ctx,next,User);
    }

    async getUserBy(ctx:Context, next: Next) {
        return super.getBy(ctx,next,User)
    }

    async addUser(ctx: Context, next: Next) {
        let name:string = ctx.request.body.name;
        let nameArray:string[] = name.split(" ");
        if(nameArray.length<2){
            ctx.status = httpStatus.BAD_REQUEST;
            ctx.response.body = "2 names required"
            return;
        }else{
            if(nameArray.some((element:string)=>element.length<4)){
                ctx.status = httpStatus.BAD_REQUEST;
                ctx.response.body = "each name must have at least 4 characters"
                return;
            }
        }

        let birthDate:Date =  ctx.request.body.birthDate;
        let suscriptionDate:Date =  ctx.request.body.suscriptionDate;

        if(suscriptionDate <= birthDate){
            ctx.status = httpStatus.BAD_REQUEST;
            ctx.response.body = "birthdate date cannot be bigger than suscriptionDate"
            return;
        }

        let age:number =  ctx.request.body.age;
        if(age < 18){
            ctx.status = httpStatus.BAD_REQUEST;
            ctx.response.body = "suscription only available for people over 18 years old"
            return;  
        }

        return super.insert(ctx,next,User);
        
    }

    async updateUser(ctx: Context, next: Next) {
        return super.update(ctx,next,User);
    }

    async deleteUser(ctx: Context, next: Next) {
        return super.delete(ctx,next,User);
    }
}