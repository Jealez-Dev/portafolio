import { Elysia } from 'elysia'
const app = new Elysia()
    .use(prueba)
    .use(proyectos)

export default app

if (import.meta.main) {
    app.listen(3000)
    console.log('🦊 Servidor corriendo en http://localhost:3000')
}
