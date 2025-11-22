import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'

new Elysia()
    .use(staticPlugin({
        assets: 'public',
        prefix: '/'
    }))
    .get('/', () => Bun.file('public/index.html'))

    .get('/api/hora', () => {
        return {
            mensaje: "Hola, bienvenido a mi portafolio",
            hora: new Date().toLocaleTimeString()
        }
    })
    .listen(3000)

console.log('🦊 Servidor corriendo en http://localhost:3000')