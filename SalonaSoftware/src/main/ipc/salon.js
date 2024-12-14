import axios from 'axios'
import { SERVER_URL } from '..'
import { salon } from '../api.js'
import Request from '../middleware/auth.js'

export function registerSalonHandlers(ipcMain) {
  ipcMain.handle('getSalon', async () => {
    try {
      const response = await axios.get(`${SERVER_URL}hnb/salon?salon_id=3`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch salon data:', error)
      return { error: 'Failed to fetch data' }
    }
  })

  ipcMain.handle('searchSalon', async ({ params, data }) => {
    try {
      const response = await axios.get(`${SERVER_URL}hnb/salon/`, { params })
      return response.data
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  })

  ipcMain.handle('getNamesAndLocation', async ({ params, data }) => {
    try {
      const response = await axios.get(`${SERVER_URL}hnb/salon/`, { params })
      return response.data
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  })

  ipcMain.handle('createSalon', async (e,data) => {
    try {
      const response = await Request.post(salon, data)
      return response.data
    } catch (e) {
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
