import express from "express"
import bcrypt from "bcrypt"
import { conn } from "./sql/conexionSQL.mjs"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/api/comprobarLogin", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Faltan datos" })
        }

        const result = await conn.execute("SELECT * FROM usuarios WHERE email = ?", [email])

        if (!result.rows || result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" })
        }

        const userData = result.rows[0]
        const user = {
            id: userData[0],
            email: userData[1],
            passwordUsuario: userData[2]
        }

        const storedPassword = user.passwordUsuario.trim()

        const match = await bcrypt.compare(password, storedPassword)

        if (!match) {
            return res.status(401).json({ error: "Credenciales incorrectas" })
        }

        res.status(200).json({ message: "Login exitoso" })

    } catch (error) {
        console.error("Error detallado en login:", error)
        res.status(500).json({ error: `Error en el servidor: ${error.message}` })
    }
})

app.post("/api/register", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Faltan datos" })
        }
        
        const checkResult = await conn.execute("SELECT * FROM usuarios WHERE email = ?", [email])
        
        if (checkResult.rows && checkResult.rows.length > 0) {
            return res.status(400).json({ error: "El email ya está registrado" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await conn.execute("INSERT INTO usuarios (email, passwordUsuario) VALUES (?, ?)", [email, hashedPassword])

        res.status(201).json({ message: "Usuario registrado exitosamente" })
    } catch (error) {
        console.error("Error en registro:", error)
        res.status(500).json({ error: "Error en el servidor" })
    }
})

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
})