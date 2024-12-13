import Request from '../middleware/auth'
import { SERVER_URL } from '..'

export function customerHandler(ipcMain) {
  ipcMain.handle('getBranchCustomer', async (event) => {
    try {
      const response = await Request.get(`${SERVER_URL}hnb/customer/`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch company data:', error)
      return { error: 'Failed to fetch data' }
    }
  })
  ipcMain.handle('getSalonCustomer', async (event, params) => {
    try {
      const response = await Request.get(`${SERVER_URL}hnb/customer/`, { params })
      return response
    } catch (error) {
      return error
    }
  })
}
