import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt"

import { organizationsRoutes } from "./http/controllers/organizations/routes";
import { env } from "./env";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_KEY,
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)


app.register(organizationsRoutes)