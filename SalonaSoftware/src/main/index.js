import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import { registerSalonHandlers } from './ipc/salon'
import { registerAppointmentHandlers } from './ipc/appointment'
import { registerStoreHandlers } from './ipc/store'
// const __dirname = dirname(fileURLToPath(import.meta.url))
// console.log(__dirname)
// const store = new Store()
let Store;
let store;
(async () => {
  Store = (await import('electron-store')).default;
  store = new Store();
  console.log("Here I am the store",store)
})();

const SERVER_IP = 'http://127.0.0.1:8000/'
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
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  ipcMain.on('react-loaded', () => {
    mainWindow.maximize()
    mainWindow.setTitle('Salona') // Set the title when React is fully loaded
    mainWindow.show() // Show the window
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// ipcMain.handle('registerOwner', async (e, data) => {
//   const re = await axios.post(`${SERVER_IP}hnb/salon_owner/`, data)
//   console.log(re.data)
// })

ipcMain.handle('signinOwner', async (e, data) => {
  const re = await axios.post(`${SERVER_IP}hnb/salon_owner/`, data)
  console.log(re.data)
})

// ipcMain.handle('getSalon', async () => {
//   try {
//     const response = await axios.get(`${SERVER_IP}hnb/salon?salon_id=3`)
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch company data:', error)
//     return { error: 'Failed to fetch data' }
//   }
// })

ipcMain.handle('getUsers', async (event) => {
  try {
    const response = await axios.get(`${SERVER_IP}hnb/users/`)
    console.log('Response', response)
    return response.data
  } catch (error) {
    console.error('Failed to fetch company data:', error)
    return { error: 'Failed to fetch data' }
  }
})

// ipcMain.handle('createTruck', async (event, someArguments) => {
//   try {
//     console.log(someArguments)
//     const response = await axios.post(`${SERVER_IP}chand/Vehicle/`, someArguments)
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch company data:')
//     return { error: 'Failed to fetch data' }
//   }
// })

// ipcMain.handle('getVehicle', async () => {
//   try {
//     const response = await axios.get(`${SERVER_IP}chand/Vehicle/`)
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch company data:', error)
//     return { error: 'Failed to fetch data' }
//   }
// })

// ipcMain.handle('updateTruck', async (e, args) => {
//   try {
//     const response = await axios.patch(`${SERVER_IP}chand/Vehicle/`, args)
//     return response
//   } catch (err) {
//     console.log('SOme error occured', err)
//     return { error: 'Failed to update' }
//   }
// })

// ipcMain.handle('deleteTruck', async (e, args) => {
//   try {
//     console.log(args)
//     const response = await axios.delete(`${SERVER_IP}chand/Vehicle/?number=${args}`)
//     return response
//   } catch (err) {
//     console.log('SOme error occured', err)
//     return { error: 'Failed to update' }
//   }
// })

// ipcMain.handle('getVendors', async () => {
//   try {
//     const response = await axios.get(`${SERVER_IP}chand/Vendor/`)
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch company data:', error)
//     return { error: 'Failed to fetch data' }
//   }
// })

// ipcMain.handle('createVendor', async (event, someArguments) => {
//   try {
//     const response = await axios.post(`${SERVER_IP}chand/Vendor/`, someArguments)
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch company data:')
//     return { error: 'Failed to fetch data' }
//   }
// })

// ipcMain.handle('updateVendor', async (e, args) => {
//   try {
//     const response = await axios.patch(`${SERVER_IP}chand/Vendor/`, args)
//     return response
//   } catch (err) {
//     console.log('SOme error occured', err)
//     return { error: 'Failed to update' }
//   }
// })

// ipcMain.handle('getBills', async () => {
//   try {
//     const response = await axios.get(`${SERVER_IP}chand/Bill/`)
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch company data:', error)
//     return { error: 'Failed to fetch data' }
//   }
// })


app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  registerSalonHandlers(ipcMain);
  registerAppointmentHandlers(ipcMain);
  registerStoreHandlers(ipcMain);

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
