import { Context, Next } from 'koa';
import { User } from '../../database/entities/User';
import { BaseController } from '../base.controller';

export class UserController extends BaseController {
    constructor(){
        super();
    }

    async getPrice(ctx:Context, next: Next) {
        return super.getAll(ctx,next,User);
    }

    async getPriceBy(ctx:Context, next: Next) {
        return super.getBy(ctx,next,User)
    }

    async addPrice(ctx: Context, next: Next) {
        return super.insert(ctx,next,User);
        
    }

    async updatePrice(ctx: Context, next: Next) {
        return super.update(ctx,next,User);
    }

    async deletePrice(ctx: Context, next: Next) {
        return super.delete(ctx,next,User);
    }
}