import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { prueba } from './server/api/prueba.js'
import { proyectos } from './server/api/supabase.js'

const app = new Elysia()
    .use(staticPlugin({
        assets: 'public',
        prefix: '/'
    }))
    .get('/', () => Bun.file(`${import.meta.dir}/public/index.html`))
    .use(prueba)
    .use(proyectos)

export default app

if (import.meta.main) {
    app.listen(3000)
    console.log('🦊 Servidor corriendo en http://localhost:3000')
}
