"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_HOST = exports.DB_USER = void 0;
var dotenv = require("dotenv");
dotenv.config();
exports.DB_USER = (_a = process.env, _a.DB_USER), exports.DB_HOST = _a.DB_HOST, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_DATABASE = _a.DB_DATABASE, exports.DB_PORT = _a.DB_PORT;
//# sourceMappingURL=config.js.map