import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import { registerSalonOwnerHandlers } from './ipc/auth'
import { registerSalonHandlers } from './ipc/salon'
import { registerAppointmentHandlers } from './ipc/appointment'
import { loadEnv, registerStoreHandlers } from './ipc/store'
import { ServiceApi } from './ipc/services'
import '../main/middleware/auth'
import { customerHandler } from './ipc/customer'
import { registerEnv } from './ipc/configEnv'
// const __dirname = dirname(fileURLToPath(import.meta.url))
// console.log(__dirname)
// const store = new Store()

export const SERVER_URL = process.env.SALONA_BACKEND_URL && 'http://127.0.0.1:8000/'
export const SALON_ID = process.env.SALON_ID
export const BRANCH_ID = process.env.BRANCH_ID

const gs = globalShortcut
function createWindow() {
  gs.register('f5', function () {
    console.log('f5 is pressed')
    mainWindow.reload()
  })
  gs.register('CommandOrControl+R', function () {
    console.log('CommandOrControl+R is pressed')
    mainWindow.reload()
  })
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      enableRemoteModule: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webviewTag: true
    }
  })

  ipcMain.on('react-loaded', () => {
    mainWindow.maximize()
    mainWindow.setTitle('Salona')
    mainWindow.show()
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  // mainWindow.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url)
  //   return { action: 'deny' }
  // })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // ALL THE API REGISTERED
  registerSalonOwnerHandlers(ipcMain)
  registerSalonHandlers(ipcMain)
  registerAppointmentHandlers(ipcMain)
  registerStoreHandlers(ipcMain)
  ServiceApi(ipcMain)
  customerHandler(ipcMain)
  registerEnv(ipcMain)
  // loadEnv({ SERVER_URL, SALON_ID, BRANCH_ID })

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Expense ease reference 
// ipcMain.handle('updateTruck', async (e, args) => {
//   try {
//     const response = await axios.patch('http://127.0.0.1:8000/chand/Vehicle/', args)
//     return response
//   } catch (err) {
//     console.log('SOme error occured', err)
//     return { error: 'Failed to update' }
//   }
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
