import 'reflect-metadata';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as helmet from 'koa-helmet';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import router from './server';

import { AppDataSource } from "./data-source"

const app = new Koa();
const port = process.env.PORT || 3000;


AppDataSource
    .initialize()
    .then(async () => {
      console.log("Data Source has been initialized!")
      app.use(helmet());
      app.use(cors());
      app.use(json());
      app.use(logger());
      app.use(bodyParser());
      
      app.use(router.routes());
      app.use(router.allowedMethods());
      app.listen(port, () => {
        console.log(`🚀 App listening on the port ${port}`);
      });
      
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
