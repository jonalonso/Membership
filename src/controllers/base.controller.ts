
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

    async insert(ctx: Context, next: Next,type:ObjectType<typeof Entity>,historicalType:ObjectType<typeof Entity> | undefined = undefined) {
        let input = ctx.request.body;
        let response = await AppDataSource.manager.insert(type,input)
        ctx.body = 'OK'
        ctx.status = 200;
        if(historicalType){
            input= {...input,...BaseController.historicalAttributes('created',response.identifiers.pop()?.id)};
            await AppDataSource.manager.insert(historicalType,input)
        }
        return next();
    }

    async update(ctx: Context, next: Next,type:ObjectType<typeof Entity>,historicalType:ObjectType<typeof Entity> | undefined = undefined) {
        let input = ctx.request.body;
        const id:number = Number(ctx.query.id);
        await AppDataSource.manager.update(type,{id:id},input);
        ctx.body = 'OK'
        ctx.status = 200;
        if(historicalType){
            let data = await (await AppDataSource.manager.findBy(type,{id})).pop();
            let historical= {...data,  ...BaseController.historicalAttributes('edited',id)};
            await AppDataSource.manager.insert(historicalType,historical)
        }
        return next();
    }

    async delete(ctx: Context, next: Next,type:ObjectType<typeof Entity>,historicalType:ObjectType<typeof Entity> | undefined = undefined) {
        const id:number = Number(ctx.query.id);
        let data = await (await AppDataSource.manager.findBy(type,{id})).pop();
        await AppDataSource.manager.delete(type,{id});
        ctx.body = 'OK'
        ctx.status = 200;
        if(historicalType){
            let historical= {...data,  ...BaseController.historicalAttributes('deleted',id)};
            await AppDataSource.manager.insert(historicalType,historical)
        }
        return next();
    }

    static historicalAttributes(eventType:String,original_id:number | undefined= undefined){
        return {
            original_id: original_id? original_id: 1,
            event_type: eventType,
            user_id: 'system',
            created_at: new Date(),
            updated_at: new Date(),
            trace_id: 'trace_id'
        }
    }
}