window.addEventListener("load", () => {
    let form = document.querySelector(".header-search");
    let textoBusqueda = document.querySelector(".search-input-field");
    var busqueda;

    form.addEventListener("submit", (e) => {
        window.location.replace("http://localhost:3030/productos/busqueda/" + textoBusqueda.value);
        e.preventDefault()
       });
    })