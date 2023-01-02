import * as Router from "koa-router";
import { UserController } from "../../controllers/user/user.controller";
import { createPriceSchema, updatePriceSchema } from "./validate";
import { authorized } from "../../middlewares/authorized";
import { validate } from "../../middlewares/validate";
const controller = new UserController();

const router = new Router();

router.get("/by", authorized([]),validate(updatePriceSchema), controller.getUserBy);
router.get("/", authorized([]), controller.getUser);

router.post(
  "/",
  authorized([]),
  validate(createPriceSchema),
  controller.addUser
);
router.put(
  "/",
  authorized([]),
  validate(updatePriceSchema),
  controller.updateUser
);
router.delete("/", authorized([]), controller.deleteUser);

export default router.routes();
