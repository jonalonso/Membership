import * as Router from "koa-router";
import HealthCheckRoutes from "./routes/health-check.routes";
import userRoutes from "./routes/user/user.routes";
const router = new Router();

router.use("/health-check", HealthCheckRoutes);
router.use("/user", userRoutes);

export default router;
