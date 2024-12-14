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

  ipcMain.handle('createBranch', async (e, data) => {
    try {
      const response = await Request.post(branch, data)
      return response
    } catch (e) {
      return e
    }
  })
}
