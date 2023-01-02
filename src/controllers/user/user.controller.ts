import { Context, Next } from 'koa';
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
        console.log("🚀 ~ file: user.controller.ts:19 ~ UserController ~ addUser ~ ctx", ctx.request.body)
        return super.insert(ctx,next,User);
        
    }

    async updateUser(ctx: Context, next: Next) {
        return super.update(ctx,next,User);
    }

    async deleteUser(ctx: Context, next: Next) {
        return super.delete(ctx,next,User);
    }
}