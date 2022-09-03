

let movie = async function(value){
    try {
        if(value){
            let response = await fetch(`http://localhost:3031/api/movies/${value}`)
            let peli = await response.json()
            return peli
        }
        
    } catch (error) {
        console.log(error)
    }
}

let genres = async function(){
    try {
        let response = await fetch(`http://localhost:3031/api/genres`)
        let generos = await response.json()
        return generos
    } catch (error) {
        console.log(error)
    }
}

window.onload = async () => {
    try {
        console.log("formulario sucess!!")
        let query = new URLSearchParams(location.search);
/*         console.log(query.get('id'))//conseguimos el id de la pelicula */

        let gen = await genres();

        console.log(gen.data)
        
        gen.data.forEach(async genero => {
            if(query.get('id')){
                let pelicula = await movie(query.get('id'))
                if(pelicula.data.genre.id == genero.id){
                    document.getElementById('genres').innerHTML += `<option value="${genero.id}" selected> ${genero.name}</option>`
                }else{
                    document.getElementById('genres').innerHTML += `<option value="${genero.id}"> ${genero.name}</option>`
                }
            }else{
                document.getElementById('genres').innerHTML += `<option value="${genero.id}"> ${genero.name}</option>`
            }
        })

        if(query.get('id')){
            let pelicula = await movie(query.get('id'))
            console.log(pelicula.data.genre.id)
            document.getElementById('title').value = pelicula.data.title
            document.getElementById('rating').value = pelicula.data.rating
            document.getElementById('awards').value = pelicula.data.awards
            document.getElementById('release_date').value = moment(pelicula.data.release_date).format('YYYY-MM-DD')
            document.getElementById('length').value = pelicula.data.length
        }
        
        document.getElementById("formulario").setAttribute("action", "home.html")
        document.getElementById('editarbutton').setAttribute("type", "submit")

        if(query.get('id')){
            document.getElementById('crearbutton').setAttribute("style", "display:none;")
        }else{
            document.getElementById('eliminarbutton').setAttribute("style", "display:none;")
            document.getElementById('editarbutton').setAttribute("style", "display:none;")

        }


        document.getElementById('editarbutton')?.addEventListener('click', async function(e){
            try {
                let pelicula = await movie(query.get('id'))
                let response = await fetch(`http://localhost:3031/api/movies/update/${pelicula.data.id}`, {
                    method: "put",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: document.getElementById('title').value,
                        rating: document.getElementById('rating').value,
                        awards: document.getElementById('awards').value,
                        release_date: document.getElementById('release_date').value,
                        length: document.getElementById('length').value,
                        genre_id : document.getElementById('genres').value
                    })
                })

            } catch (error) {
                console.log(error)
            }
        })

        document.getElementById('eliminarbutton')?.addEventListener('click', async function(){
            let pelicula = await movie(query.get('id'))
            try {
                let response = await fetch(`http://localhost:3031/api/movies/delete`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id : pelicula.data.id
                    })
                })
                let respuesta = await response.json()
            } catch (error) {
                console.log(error)
            }
        })

        document.getElementById('crearbutton')?.addEventListener('click', async function(){
            try {
                let response = await fetch(`http://localhost:3031/api/movies/create`, {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        title: document.getElementById('title').value,
                        rating: document.getElementById('rating').value,
                        awards: document.getElementById('awards').value,
                        release_date: document.getElementById('release_date').value,
                        length: document.getElementById('length').value,
                        genre_id : document.getElementById('genres').value
                    })
                })
                let respuesta = await response.json()
                console.log(respuesta)
            } catch (error) {
                console.log(error)
            }
        })

    } catch (error) {
        console.log(error)
    }


    
    




}