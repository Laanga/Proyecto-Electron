window.onload = () => {
    const { ipcRenderer } = require("electron")

    ipcRenderer.on("mostrar-info-piloto", (event, pilotoSeleccionado) => {
        document.getElementById("imagen").src = pilotoSeleccionado.headshot_url
        document.getElementById("nombre").innerText = pilotoSeleccionado.full_name
        document.getElementById("apodo").innerText = `Apodo: ${pilotoSeleccionado.name_acronym}`
        document.getElementById("equipo").innerText = `Equipo: ${pilotoSeleccionado.team_name}`
        document.getElementById("numero").innerText = `Número: ${pilotoSeleccionado.driver_number}`
        document.getElementById("nacionalidad").innerText = `Nacionalidad: ${pilotoSeleccionado.country_code}`
    })

    btnVolver = document.getElementById("btnVolver")
    
    btnVolver.addEventListener("click", function() {
        ipcRenderer.send("navigate-to-principal")
    })
    
}
