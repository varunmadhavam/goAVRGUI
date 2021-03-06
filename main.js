// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {preload: path.join(app.getAppPath(), 'js/app_pre.js')},
    width: 800,
    height: 660,
    resizable: false
  })

  // and load the index.html of the app.
  mainWindow.loadFile('app.html')
  mainWindow.webContents.openDevTools()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
   
  var menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
          {
            label:'Exit',
            click() { 
              app.quit() 
            }
          }
        ]
    },
    {
      label: 'Edit',
      submenu: [
          {
            label:'Devices',
            click() { 
              editDevices() 
            }
          }
        ]
    },
    {
      label: 'Debug',
      submenu: [
          {
            label:'Toggle Dev Tools',
            click() { 
              toggledevtools() 
            }
          }
        ]
    }
  ])
  Menu.setApplicationMenu(menu); 

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function editDevices()
{
  let win = new BrowserWindow({
    webPreferences: {preload: path.join(app.getAppPath(), 'js/device_pre.js')},
    parent: mainWindow, 
    modal: true,
    resizable: false,
    width: 500, 
    height: 530 
  })
  win.on('close', function () 
  { win = null 
    mainWindow.reload()
  })
  win.setMenu(null)
  win.loadFile("html/devices.html")
  win.webContents.openDevTools()
}

function toggledevtools() {
  mainWindow.toggleDevTools();
}