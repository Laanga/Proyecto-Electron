window.onload = async () => {
    const { ipcRenderer } = require("electron")
    const axios = require("axios")

    const contenedorPilotos = document.getElementById("contenedor-pilotos")

    try {
        const response = await axios.get("https://api.openf1.org/v1/drivers?session_key=9158")
        const pilotos = response.data

        pilotos.forEach(piloto => {
            const pilotoElemento = document.createElement("div")
            pilotoElemento.classList.add("piloto")
            pilotoElemento.innerHTML = `
                <h2>${piloto.full_name}</h2>
                <img src="${piloto.headshot_url}" alt="${piloto.full_name}" />
                <button class="moreInfo" data-driver-number="${piloto.driver_number}">Más información</button>
            `
            //utilizamos el data-driver-number para cogerlo cuando le den click y pasarselo como atributo
            pilotoElemento.querySelector(".moreInfo").addEventListener("click", async (event) => {
                const driverNumber = event.target.getAttribute("data-driver-number")

                try {
                    const pilotoInfoResponse = await axios.get(`https://api.openf1.org/v1/drivers?driver_number=${driverNumber}&session_key=9158`)
                    const pilotoInfo = pilotoInfoResponse.data[0]

                    ipcRenderer.send("navigate-to-piloto", pilotoInfo)
                } catch (error) {
                    console.error("Error al obtener información del piloto:", error)
                }
            })

            contenedorPilotos.appendChild(pilotoElemento)
        })
    } catch (error) {
        console.error("Error al cargar los pilotos:", error)
    }
}

