import { combo } from '../api'
import axios from 'axios'
import { getAllStoreData } from './store'
import Request from '../middleware/auth'

export const ComboApi = (ipcMain) => {
  ipcMain.handle('createCombo', async (event, data) => {
    try {
      const response = await Request.post(combo, data)
      return response
    } catch (e) {
      console.error(e)
      return e
    }
  })
  ipcMain.handle('getCombos', async (event, params) => {
    try {
      const response = await Request.get(combo, { params })
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('getSalonCombos', async (event) => {
    try {
      const response = await Request.get(combo)
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('updateCombos', async (event, { data, params }) => {
    try {
      const response = await Request.put(combo, data)
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('deleteCombos', async (event, { data, params }) => {
    try {
      const response = await Request.delete(combo, data)
      return response
    } catch (e) {
      return e
    }
  })
}
