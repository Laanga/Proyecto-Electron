const { app, BrowserWindow, ipcMain } = require('electron')

let ventanaLogin
let ventanaRegistro
let ventanaPrincipal
let ventanaPilotoInfo

const createVentanaLogin = (height, width) => {
  ventanaLogin = new BrowserWindow({
    height,
    width,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  ventanaLogin.loadFile("./src/html/index.html")

}

const createVentanaRegistro = (height, width) => {
  ventanaRegistro = new BrowserWindow({
    height,
    width,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  ventanaRegistro.loadFile("./src/html/register.html")

}

const createVentanaPrincipal = (height, width) => {
  ventanaPrincipal = new BrowserWindow({
    height,
    width,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  ventanaPrincipal.loadFile("./src/html/principal.html")
}

const createVentanaPilotoInfo = (height, width) => {
  ventanaPilotoInfo = new BrowserWindow({
    height,
    width,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  ventanaPilotoInfo.loadFile("./src/html/piloto.html")

// esto es un puente
ventanaPilotoInfo.webContents.once('did-finish-load', () => {
  if (pilotoSeleccionado) {
    ventanaPilotoInfo.webContents.send("mostrar-info-piloto", pilotoSeleccionado)
  }
})
}

app.whenReady().then(() => {
  createVentanaLogin(800, 800)
})

ipcMain.on("navigate-to-register", () => {
  if (ventanaLogin) {
    ventanaLogin.close()
  }
  createVentanaRegistro(800, 800)
})

ipcMain.on("navigate-to-login", () => {
  if (ventanaRegistro) {
    ventanaRegistro.close()
  }
  createVentanaLogin(800, 800)
})

ipcMain.on("navigate-to-principal", () => {
  if (ventanaLogin && !ventanaLogin.isDestroyed()) {
    ventanaLogin.close()
    ventanaLogin = null
  }
  if (ventanaPilotoInfo && !ventanaPilotoInfo.isDestroyed()) {
    ventanaPilotoInfo.close()
    ventanaPilotoInfo = null
  }
  if (ventanaRegistro && !ventanaRegistro.isDestroyed()) {
    ventanaRegistro.close()
    ventanaRegistro = null
  }
  createVentanaPrincipal(800, 800)
})


ipcMain.on("navigate-to-piloto", (event, pilotoInfo) => {
  if (ventanaPrincipal){
    ventanaPrincipal.close()
  }
  pilotoSeleccionado = pilotoInfo 
  createVentanaPilotoInfo(800, 800)
})