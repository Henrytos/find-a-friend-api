import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { jwtVerify } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";


export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/organizations', register)
    app.post('/session', authenticate)
    app.get('/me', {
        onRequest: [jwtVerify]
    }, profile)

    app.patch('/token/refresh', refresh)
}