"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./database/entities/User");
var config_1 = require("./config/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.DB_HOST,
    port: Number(config_1.DB_PORT),
    username: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User_1.User],
    migrations: ['./database/migration/**'],
    subscribers: [],
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=data-source.js.map