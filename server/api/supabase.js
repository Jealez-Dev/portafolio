import { createClient } from "@supabase/supabase-js";
import { Elysia } from "elysia"

const supabase = createClient('https://soebcyzqyqtbzvvgzudw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZWJjeXpxeXF0Ynp2dmd6dWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NDg0NzIsImV4cCI6MjA3OTMyNDQ3Mn0.457cWOWTuN6AM7VyW-LWK4y-3hQ9J2rqKDWkkvJg_Ak')

export const proyectos = new Elysia()
    .get('/proyectos', async ({ set }) => {
        const { data, error } = await supabase.from('projects').select('*')
        if (error) {
            set.status = 500
            return { error: error.message }
        }
        return data
    })
    .post('/proyectos1', async ({ body, set }) => {
        const img = body.img
        const name_project = body.name_project
        const description_project = body.description_project

        const { data: dataIMG, error: errUpload } = await supabase
            .storage
            .from('Prueba')
            .upload(`fotos/${Date.now()}_${img.name}`, img)

        if (errUpload) {
            return { error: "Falló", details: errUpload }
        }

        const { data: urlpublic } = supabase
            .storage.from('Prueba')
            .getPublicUrl(dataIMG.path)

        const { error: errDB } = await supabase
            .from('projects')
            .insert({
                name_project: name_project,
                description_project: description_project,
                url_img: urlpublic.publicUrl
            })

        if (errDB) {
            return { error: "Fallido la subida" }
        }

        return { success: true, mensaje: "Proyecto guardado" }

    })