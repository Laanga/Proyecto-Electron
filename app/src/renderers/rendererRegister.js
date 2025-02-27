window.onload = () => {

    const axios = require('axios')
    const {ipcRenderer} = require("electron")

    const btnRegister = document.getElementById("btnRegister")
    const errorDiv = document.getElementById("errorLogin")
    const btnLogin = document.getElementById("btnLogin")

    btnRegister.onclick = registerUser
    btnLogin.onclick = goLogin

    async function registerUser() {

        const email = document.getElementById("email").value.trim()
        const password = document.getElementById("password").value.trim()
        const passwordConfirmar = document.getElementById("passwordConfirmar").value.trim()

        if (!email || !password || !passwordConfirmar) {
            errorDiv.innerText = "Por favor, completa todos los campos"
            return
        }

        if (password !== passwordConfirmar) {
            errorDiv.innerText = "Las contraseñas no coinciden"
            return
        }

        try {
            const result = await axios.post("http://localhost:3000/api/register", {
                email,
                password
            })

            if (result.status === 201) {
                console.log("Usuario registrado exitosamente")
                ipcRenderer.send("navigate-to-principal")
            } else {
                errorDiv.innerText = "Error al registrar usuario"
            }
        } catch (error) {
            console.error("Error en la solicitud:", error)
        }
    }
    function goLogin() {
        ipcRenderer.send("navigate-to-login")
    }
}
