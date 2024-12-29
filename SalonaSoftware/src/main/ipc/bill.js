import { bill } from '../api'
import Request from '../middleware/auth'

export const BillApi = (ipcMain) => {
  ipcMain.handle('getBills', async (event, params) => {
    try {
      const response = await Request.get(bill, { params })
      return response
    } catch (e) {
      return e
    }
  })

  ipcMain.handle('createBill', async (e, data) => {
    try {
      const response = await Request.post(bill, data)
      return response
    } catch (e) {
      return e
    }
  })
}
