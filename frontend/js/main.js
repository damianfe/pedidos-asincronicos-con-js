window.onload = async () => {
  try {
    const app = document.getElementById("root");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    app.appendChild(container);
  
    let list = async function(){
      try {
        let result = await fetch('http://localhost:3031/api/movies')
        let pelis = await result.json()
        return pelis
      } catch (error) {
        console.log(error)
      }
    }
  
      let peliculas = await list()
    
      let data = peliculas.data;
  
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
  
        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
  
        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;
  
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
  
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);

        const buttonEdit = document.createElement('a');
        buttonEdit.setAttribute("href", "formulario.html?id=" + movie.id);
        buttonEdit.setAttribute("class", "botonAgregar");
        buttonEdit.textContent = "editar"
        card.appendChild(buttonEdit)
      });  
  } catch (error) {
   console.log(error) 
  }
  
};
