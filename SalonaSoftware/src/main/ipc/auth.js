import axios from 'axios'
import Request from '../middleware/auth'
import { salonMaintainerSignIn, salonOwnerSignIn, salonOwnerSignUp } from '../api'

export function registerSalonOwnerHandlers(ipcMain) {
  ipcMain.handle('registerOwner', async (e, data) => {
    try {
      const response = await axios.post(salonOwnerSignUp, data)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to register owner:', error)
      return { error: 'Failed to register owner' }
    }
  })

  ipcMain.handle('signinOwner', async (e, data) => {
    try {
      const response = await Request.post(salonOwnerSignIn, data)
      return response // Return a clean object
    } catch (error) {
      return error // Send safe error
    }
  })
  ipcMain.handle('signinMaintainer', async (e, data) => {
    try {
      const response = await Request.post(salonMaintainerSignIn, data)
      return response
    } catch (error) {
      return error
    }
  })
}
