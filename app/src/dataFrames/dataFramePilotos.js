const axios = require("axios")
const { DataFrame } = require("data-forge")

const analizarDatosPilotos = async () => {
    try {
        const response = await axios.get("https://api.openf1.org/v1/drivers?session_key=9158")
        const pilotos = response.data

        const df = new DataFrame(pilotos).dropSeries("headshot_url") //para quitarle la url que se ve muy feo

        console.log("Primeras filas del DataFrame:")
        console.table(df.head(5).toArray())

        console.log("\nNúmero total de pilotos:", df.count())

        const pilotosPorEquipo = df.groupBy(p => p.team_name)
            .select(grupo => ({
                equipo: grupo.first().team_name,
                cantidad: grupo.count()
            }))
            .inflate()

        console.log("\nCantidad de pilotos por equipo:")
        console.table(pilotosPorEquipo.toArray())

    } catch (error) {
        console.error("Error al obtener y analizar los datos:", error)
    }
}

analizarDatosPilotos()




