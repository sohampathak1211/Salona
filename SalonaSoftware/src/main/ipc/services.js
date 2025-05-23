import { services } from '../api'
import axios from 'axios'
import { getAllStoreData } from './store'
import Request from '../middleware/auth'

export const ServiceApi = (ipcMain) => {
  ipcMain.handle('createService', async (event, data) => {
    try {
      const response = await Request.post(services, data)
      return response
    } catch (e) {
      console.error(e)
      return e
    }
  })
  ipcMain.handle('getServices', async (event, params) => {
    try {
      const response = await Request.get(services, { params })
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('getSalonServices', async (event) => {
    try {
      const response = await Request.get(services)
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('updateServices', async (event, { data, params }) => {
    try {
      const response = await Request.put(services, data)
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('deleteServices', async (event, { data, params }) => {
    try {
      const response = await Request.delete(services, data)
      return response
    } catch (e) {
      return e
    }
  })
}
