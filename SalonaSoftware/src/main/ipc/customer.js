import Request from '../middleware/auth'
import { SERVER_URL } from '..'
import { customer } from '../api'

export function customerHandler(ipcMain) {
  ipcMain.handle('getBranchCustomer', async (event) => {
    try {
      const response = await Request.get(customer)
      return response
    } catch (error) {
      console.error('Failed to fetch company data:', error)
      return { error: 'Failed to fetch data' }
    }
  })
  ipcMain.handle('getSalonCustomer', async (event) => {
    try {
      const response = await Request.get(customer)
      return response
    } catch (error) {
      return error
    }
  })
}
