
import { Entity, ObjectType } from 'typeorm';
import { Context, Next } from 'koa';
import { AppDataSource } from '../data-source';

export class BaseController {

    async getAll(ctx:Context, next: Next,type:ObjectType<typeof Entity>) {
        const users = await AppDataSource.manager.find(type)
        ctx.body = users
        ctx.status = 200;
        return next();
    }

    async getBy(ctx:Context, next: Next,type:ObjectType<typeof Entity>) {
        const users = await AppDataSource.manager.findBy(type,ctx.request.body)
        ctx.body = users
        ctx.status = 200;
        return next();
    }

    async insert(ctx: Context, next: Next,type:ObjectType<typeof Entity>) {
        let input = ctx.request.body;
        await AppDataSource.manager.insert(type,input)
        ctx.body = 'OK'
        ctx.status = 200;
        return next();
    }

    async update(ctx: Context, next: Next,type:ObjectType<typeof Entity>) {
        let input = ctx.request.body;
        const id:number = Number(ctx.query.id);
        await AppDataSource.manager.update(type,{id:id},input);
        ctx.body = 'OK'
        ctx.status = 200;
        return next();
    }

    async delete(ctx: Context, next: Next,type:ObjectType<typeof Entity>) {
        const id:number = Number(ctx.query.id);
        await AppDataSource.manager.delete(type,{id});
        ctx.body = 'OK'
        ctx.status = 200;
        return next();
    }
}