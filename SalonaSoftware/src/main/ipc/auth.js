import axios from 'axios'
import { SERVER_URL } from '..'
import { deserialize, serialize } from '../utils'
import Request from '../middleware/auth'

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
      const response = await Request.post(`${SERVER_URL}hnb/salon_owner/`, data)
      return response // Return a clean object
    } catch (error) {
      return error // Send safe error
    }
  })
  ipcMain.handle('signinMaintainer', async (e, data) => {
    try {
      const response = await Request.post(`${SERVER_URL}hnb/salon_maintainer/`, data)
      return response
    } catch (error) {
      return error
    }
  })
}
