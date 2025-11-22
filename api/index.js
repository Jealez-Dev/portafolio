import { Elysia } from 'elysia'
import { prueba } from '../server/api/prueba.js'
import { proyectos } from '../server/api/supabase.js'

const app = new Elysia()
    .use(prueba)
    .use(proyectos)

export default app
