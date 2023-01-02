"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var index_controller_1 = require("./controllers/index.controller");
var users_controller_1 = require("./controllers/users.controller");
var router = new Router();
router.get('/', index_controller_1.default.getIndex);
router.get('/users', users_controller_1.default.getUsers);
exports.default = router;
//# sourceMappingURL=server.js.map