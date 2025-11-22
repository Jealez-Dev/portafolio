// Inicialización básica del archivo JS

document.addEventListener('DOMContentLoaded', () => {
    console.log('App inicializada correctamente');

    console.log('Cargando proyectos');
    loadProjects();

    document.querySelector('#admin-button button').onclick = () => {
        let contenido = "";
        contenido += "<div id='admin-panel' class='panel'>";
        contenido += "<div class='panel-content'>";
        contenido += "<form id='Formulario' method='post'>";
        contenido += "<label for='Nombre-proyecto'>Nombre del proyecto:</label>";
        contenido += "<input type='text' id='Nombre-proyecto' name='Nombre-proyecto' required>";
        contenido += "<label for='subir-imgen'>Subir imagen:</label>";
        contenido += "<input type='file' id='subir-imgen' name='subir-imgen' accept='image/*' required>";
        contenido += "<label for='Descripcion-proyecto'>Descripción del proyecto:</label>";
        contenido += "<textarea id='Descripcion-proyecto' name='Descripcion-proyecto' required></textarea>";
        contenido += "<button type='submit'>Agregar proyecto</button>";
        contenido += "</form>";
        contenido += "</div>";
        contenido += "</div>";

        document.body.insertAdjacentHTML('beforeend', contenido);

        document.querySelector('#Formulario').onsubmit = (e) => {
            e.preventDefault();
            const nombreProyecto = document.querySelector('#Nombre-proyecto').value;
            const inputImagen = document.querySelector('#subir-imgen').files[0];
            const descripcionProyecto = document.querySelector('#Descripcion-proyecto').value;
            let nuevoProyecto = "";
            const sectionProyects = document.getElementById('projects');
            let listexisting = sectionProyects.querySelector('ul');
            if (!listexisting) {
                sectionProyects.insertAdjacentHTML('beforeend', '<ul></ul>');
            }
            const listaProyectos = document.querySelector('#projects ul');

            nuevoProyecto += `<li>`;
            nuevoProyecto += `<h3>${nombreProyecto}</h3>`;
            nuevoProyecto += `<img src="${URL.createObjectURL(inputImagen)}" alt="${nombreProyecto}">`;
            nuevoProyecto += `<p>${descripcionProyecto}</p>`;
            nuevoProyecto += `</li>`;

            listaProyectos.insertAdjacentHTML('beforeend', nuevoProyecto);
            uploadProject();
            addclass();
            document.getElementById('admin-panel').remove();
        };
    };

});

function addclass() {
    const ListaP = document.querySelectorAll('#projects ul li');
    ListaP.forEach((item, index) => {
        if (!item.className) {
            item.classList.add('proyecto-' + (index + 1));
        }
    });
}

async function loadProjects() {
    const response = await fetch('/proyectos');
    const data = await response.json();

    const ListaP = document.querySelector('#projects ul')

    data.forEach((data) => {
        let addproyect = `<li>`
        addproyect += `<h3>${data.name_project}</h3>`
        addproyect += `<img src="${data.url_img}" alt="${data.name_project}">`
        addproyect += `<p>${data.description_project}</p>`
        addproyect += `</li>`

        ListaP.insertAdjacentHTML('beforeend', addproyect)
    })

    addclass()
}

async function uploadProject() {

    const formdata = new FormData();
    formdata.append('img', document.querySelector('#subir-imgen').files[0]);
    formdata.append('name_project', document.querySelector('#Nombre-proyecto').value);
    formdata.append('description_project', document.querySelector('#Descripcion-proyecto').value);

    const response = await fetch('/proyectos1', {
        method: 'POST',
        body: formdata
    });

    const data = await response.json();

    if (data.success) {
        alert(data.mensaje);
    } else {
        alert(data.error);
    }

}



