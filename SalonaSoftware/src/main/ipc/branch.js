import { branch } from '../api'
import axios from 'axios'
import { getAllStoreData } from './store'
import Request from '../middleware/auth'

export const BranchApi = (ipcMain) => {
  ipcMain.handle('getBranchesOfSalon', async (event, params) => {
    try {
      const response = await Request.get(branch, { params })
      return response
    } catch (e) {
      return e
    }
  })
}
