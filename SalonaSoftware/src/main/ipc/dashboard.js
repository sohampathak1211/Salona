import { dashboard } from '../api'
import Request from '../middleware/auth'

export const DashboardApi = (ipcMain) => {
  ipcMain.handle('getHead', async (event, params) => {
    try {
      const response = await Request.get(`${dashboard}head/`, { params })
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('getSalesGraph', async (event, params) => {
    try {
      const response = await Request.get(`${dashboard}sales_graph/`, { params })
      return response
    } catch (e) {
      return e
    }
  })
}
