import { Context, Next } from 'koa';
import httpStatus from '../../consts/httpStatusCodes';
import { AppDataSource } from '../../data-source';
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
        let validation:boolean = UserController.validateRequest(ctx);
        if(!validation){
            return;
        }
        return super.insert(ctx,next,User);
    }

    static validateRequest(ctx:Context){
        let name:string | undefined = ctx.request.body.name;
        if(name){
            let nameArray:string[] = name.split(" ");
            if(nameArray.length<2){
                ctx.status = httpStatus.BAD_REQUEST;
                ctx.response.body = "2 names required"
                return false;
            }else{
                if(nameArray.some((element:string)=>element.length<4)){
                    ctx.status = httpStatus.BAD_REQUEST;
                    ctx.response.body = "each name must have at least 4 characters"
                    return false;
                }
            }
        }

        let birthDate:Date | undefined =  ctx.request.body.birthDate;
        let suscriptionDate:Date  | undefined=  ctx.request.body.suscriptionDate;

        if(birthDate && suscriptionDate &&  suscriptionDate <= birthDate){
            ctx.status = httpStatus.BAD_REQUEST;
            ctx.response.body = "birthdate date cannot be bigger than suscriptionDate"
            return false;
        }

        let age:number | undefined=  ctx.request.body.age;
        if(age && age < 18){
            ctx.status = httpStatus.BAD_REQUEST;
            ctx.response.body = "suscription only available for people over 18 years old"
            return false;  
        }

        if(birthDate && age &&  (Math.floor((new Date().getTime()-birthDate.getTime())/31556952000))!==age){
            ctx.status = httpStatus.BAD_REQUEST;
            ctx.response.body = "age based on brithdate is different from age declared"
            return false;  
        }

        let cost:number | undefined =  ctx.request.body.cost;
        if(suscriptionDate && cost!= undefined){
            
            let calcCost = (Math.floor((new Date().getTime()-suscriptionDate.getTime())/31556952000));
            
            if(cost !== calcCost * 100){
                ctx.status = httpStatus.BAD_REQUEST;
                ctx.response.body = "cost based on suscriptionDate is different from cost declared"
                return false;   
            }
        }
        
        return true;
    }

    /*
curl --location --request PUT 'http://localhost:3000/user?id=5' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Jonathan salazar garcia",
  "age": 28,
  "birthDate": "01/01/1994",
  "suscriptionDate": "01/01/2023",
  "cost": 0
}'
    */

    async updateUser(ctx: Context, next: Next) {
        let validation:boolean = UserController.validateRequest(ctx);
        if(!validation){
            return;
        }
        const id:number = Number(ctx.query.id);
        let users:User[] = await AppDataSource.manager.findBy(User,{id});
        if(users.length>0){
            let user:User = users[0];
            ctx.request.body = {...user,...ctx.request.body};
            validation = UserController.validateRequest(ctx);
            if(!validation){
                return;
            }
            return super.update(ctx,next,User);
        }else{
            ctx.status = httpStatus.NOT_FOUND;
            ctx.response.body = "user not found"
            return;
        }
        
    }

    async deleteUser(ctx: Context, next: Next) {
        return super.delete(ctx,next,User);
    }
}