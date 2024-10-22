import { Router } from "express";
import { productsRouter } from "./productsRouter.js";
import { sessionRouter } from "./sessionsRouter.js";
import { usersRouter } from "./usersRouter.js";
import { pedidoRouter } from "./pedidoRouter.js";

export const apiRouter = Router()

apiRouter.use('/product',productsRouter)

apiRouter.use('/sessions',sessionRouter )

apiRouter.use('/users',usersRouter )


apiRouter.use('/pedido',pedidoRouter )