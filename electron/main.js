const { app, BrowserWindow } = require('electron')
const debug = true

const window = () => 
{
  const win = new BrowserWindow({ width:1600, height:1200 })
  win.loadFile('src/index.html')
  win.on('closed', () => app.quit())
  if (debug) win.webContents.openDevTools()
}

app.whenReady().then(window)

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
