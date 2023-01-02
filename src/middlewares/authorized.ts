import ApiError from '../utils/ApiError';
import { Context, Next } from 'koa';

export const checkPermissions = (user: any, permissions : Array<string>) => {
  if (permissions.length === 0) {
    return true;
  }
  //permissions.push("starlight-admin");

  return permissions.some((permission) => user.permissions.includes(permission));
};

export const authorized = (permissions:Array<string> = []) => {
  if (!Array.isArray(permissions)) {
    throw new TypeError('Expected permissions to be an array');
  }

  const authorizedMiddleware = async (ctx: Context, next:Next) => {
    const { user, serviceToken } = ctx.state;

    let byPass:Boolean = true; //TODO: remove it later
    //TODO:We still need to connect this to UMS and manage a tenant
    if (!byPass && (!user && !serviceToken)) {
      throw ApiError.notAuthenticated();
    }

    if (serviceToken || byPass) {
      await next();
      return;
    }

    if (!checkPermissions(user, permissions)) {
      throw ApiError.accessDenied("check Permissions failed");
    }

    await next();
  };

  return authorizedMiddleware;
};
