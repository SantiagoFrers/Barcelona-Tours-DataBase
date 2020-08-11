window.addEventListener("load", () => {
    let reservar = document.querySelector(".confirmacion");
    let quitarTour = document.querySelector(".quitar");

    reservar.addEventListener("submit", (evento) => {
        let confirmacion = confirm("Estas seguro de confirmar tu compra?")
        if (confirmacion === true){
            alert("Gracias por tu compra, te enviaremos el voucher a tu casilla de e-mail")
        } else {
            alert("No te preocupes! Guardamos tu carrito para cuando lo quieras confirmar")
         evento.preventDefault();
        }

    })

    quitarTour.addEventListener("submit", (evento) => {
        let confirmacionBaja = confirm("Estas seguro de quitar este tour??")
        if (confirmacionBaja === true){
            alert("Hemos quitado el tour, podes reservarlo nuevamente cuando quieras")
        } else {
            alert("Que bueno que no lo sacaste! Casi te perdes la oportunidad")
         evento.preventDefault();
        }

    })

});