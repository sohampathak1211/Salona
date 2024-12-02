import axios from 'axios'

const SERVER_IP = 'http://127.0.0.1:8000/'

export function registerSalonOwnerHandlers(ipcMain) {
  ipcMain.handle('registerOwner', async (e, data) => {
    try {
      const response = await axios.post(`${SERVER_IP}hnb/salon_owner/`, data)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to register owner:', error)
      return { error: 'Failed to register owner' }
    }
  })

  ipcMain.handle('signinOwner', async (e, data) => {
    try {
      const re = await axios.post(`${SERVER_IP}hnb/salon_owner/`, data)
      return re
    } catch (error) {
      console.error('Failed to signin owner:', error.response.data)
      return error.response.data
    }
  })
}
