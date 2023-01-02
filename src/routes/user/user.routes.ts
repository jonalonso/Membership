import * as Router from "koa-router";
import { UserController } from "../../controllers/user/user.controller";
import { createPriceSchema, updatePriceSchema } from "./validate";
import { authorized } from "../../middlewares/authorized";
import { validate } from "../../middlewares/validate";
const controller = new UserController();

const router = new Router();

router.get("/by", authorized([]),validate(updatePriceSchema), controller.getPriceBy);
router.get("/", authorized([]), controller.getPrice);

router.post(
  "/",
  authorized([]),
  validate(createPriceSchema),
  controller.addPrice
);
router.put(
  "/",
  authorized([]),
  validate(updatePriceSchema),
  controller.updatePrice
);
router.delete("/", authorized([]), controller.deletePrice);

export default router.routes();
