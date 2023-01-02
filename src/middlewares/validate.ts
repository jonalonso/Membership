import ApiError from '../utils/ApiError';
import { Context,Next } from 'koa';

export const validate =
  (schema:any) =>
  async (ctx:Context, next:Next) => {
    const dataToValidate = {...ctx.request.body};
    ctx.request.body = {}
    let validatedData;
    try {
      validatedData = await schema.validateAsync(dataToValidate, {
        stripUnknown: false,
        convert: true,
        context: undefined,
      });
    } catch (err:any) {
      throw ApiError.invalidRequest("Invalid request", err.details || err.message);
    }

    if (validatedData) {
      if (Array.isArray(validatedData)) {
        if (!Array.isArray(ctx.request.body)) {
          ctx.request.body = Array.from(
            validatedData
          );
        }
        ctx.request.body = validatedData;
      }
      Object.assign(ctx.request.body, validatedData);
    }
    await next();
  };
