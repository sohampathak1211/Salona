import axios from 'axios'
import { SERVER_URL } from '..'

export function registerSalonOwnerHandlers(ipcMain) {
  ipcMain.handle('registerOwner', async (e, data) => {
    try {
      const response = await axios.post(`${SERVER_URL}hnb/salon_owner/`, data)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to register owner:', error)
      return { error: 'Failed to register owner' }
    }
  })

  ipcMain.handle('signinOwner', async (e, data) => {
    try {
      const re = await axios.post(`${SERVER_URL}hnb/salon_owner/`, data)
      return re
    } catch (error) {
      console.error('Failed to signin owner:', error.response.data)
      return error.response.data
    }
  })
}
