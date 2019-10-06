const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow

function editDevices()
{
  let win = new BrowserWindow({ width: 400, height: 200 })
  win.on('close', function () { win = null })
  win.loadURL("index.html")
  win.show()
}