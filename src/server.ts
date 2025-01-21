import { app } from "./app";
import { env } from "./env";

app.listen({
    port: env.PORT,
    host: 'localhost'
}).then(() => {
    console.log(`��� Server ready at http://localhost:${env.PORT}`)
    console.log(`🚀 listening on port: ${env.PORT} 🚀🚀🚀🚀`)
})

