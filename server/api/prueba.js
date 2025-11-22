import { Elysia } from "elysia";

export const prueba = new Elysia()
    .get("/prueba", ({ set }) => {
        set.headers['Content-Type'] = 'text/html'
        return `<!DOCTYPE html><html><body><h1>Hola Mundo</h1></body></html>`
    })
