import { SERVER_URL } from '..'
import { salon } from '../api.js'
import Request from '../middleware/auth.js'

export function registerSalonHandlers(ipcMain) {
  ipcMain.handle('createSalon', async (e, data) => {
    try {
      const response = await Request.post(salon, data)
      return response.data
    } catch (e) {
      return { error: 'Failed to search salon' }
    }
  })
  ipcMain.handle('getSalon', async (e) => {
    try {
      const response = await Request.get(salon)
      return response
    } catch (error) {
      console.error('Failed to fetch salon data:', error)
      return { error: 'Failed to fetch data' }
    }
  })
  ipcMain.handle('updateSalon', async (e, data) => {
    try {
      const response = await Request.patch(salon, data)
      return response
    } catch (error) {
      console.error('Failed to fetch salon data:', error)
      return { error: 'Failed to fetch data' }
    }
  })

  //  Api Calls below are not in use 
  ipcMain.handle('searchSalon', async ({ params, data }) => {
    try {
      const response = await Request.get(salon, { params })
      return response.data
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  })

  ipcMain.handle('getNamesAndLocation', async ({ params, data }) => {
    try {
      const response = await Request.get(`${SERVER_URL}hnb/salon/`, { params })
      return response.data
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  })

  ipcMain.handle('getSalonOfOwner', async (e, params) => {
    try {
      const response = await Request.get(salon, { params })
      return response
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  })
}
