import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { prueba } from './api/prueba.js'
import { proyectos } from './api/supabase.js'

new Elysia()
    .use(staticPlugin({
        assets: 'public',
        prefix: '/'
    }))
    .get('/', () => Bun.file(`${import.meta.dir}/../public/index.html`))
    .use(prueba)
    .use(proyectos)

    .listen(3000)

console.log('🦊 Servidor corriendo en http://localhost:3000')