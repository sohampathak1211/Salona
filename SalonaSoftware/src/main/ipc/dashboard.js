import { dashboard } from '../api'
import Request from '../middleware/auth'

export const DashboardApi = (ipcMain) => {
  ipcMain.handle('getSalesGraph', async (event, params) => {
    try {
      const response = await Request.get(`${dashboard}sales_graph/`, { params })
      return response
    } catch (e) {
      return e
    }
  })
}
