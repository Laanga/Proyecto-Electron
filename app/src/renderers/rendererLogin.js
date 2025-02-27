window.onload = () => {

    const axios = require('axios')
    const {ipcRenderer} = require("electron")

    const btnLogin = document.getElementById("btnLogin")
    const errorDiv = document.getElementById("errorLogin")
    const registerButton = document.getElementById("btnRegister")

    btnLogin.onclick = comprobarLogin
    registerButton.onclick = goRegister

    async function comprobarLogin() {
        errorDiv.innerText = ""

        const email = document.getElementById("email").value.trim()
        const password = document.getElementById("password").value.trim()

        if (!email || !password) {
            errorDiv.innerText = "Por favor, ingresa email y contraseña"
            return
        }

        try {
            const result = await axios.post("http://localhost:3000/api/comprobarLogin", {
                email,
                password
            })

            if (result.status === 200 && result.data.message === "Login exitoso") {
                console.log("Login exitoso")
                ipcRenderer.send("navigate-to-principal")
            } else {
                errorDiv.innerText = "Credenciales incorrectas"
            }
            
        } catch (error) {
            console.error("Error en la solicitud:", error)
            errorDiv.innerText = "Error al conectar con el servidor"
        }
    }

    function goRegister() {
        ipcRenderer.send("navigate-to-register")
    }
}




