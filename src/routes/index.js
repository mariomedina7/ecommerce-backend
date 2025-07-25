import { Router } from "express";
import usersRouter from "./user.routes.js"
import sessionsRouter from "./sessions.routes.js"
import productRouter from "./products.routes.js"
import cartsRouter from "./carts.routes.js"

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/sessions", sessionsRouter);
indexRouter.use("/products", productRouter);
indexRouter.use("/carts", cartsRouter);

export default indexRouter;