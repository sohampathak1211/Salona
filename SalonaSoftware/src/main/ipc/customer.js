import Request from '../middleware/auth'
import { SERVER_URL } from '..'

export function customerHandler(ipcMain) {
  ipcMain.handle('getUsers', async (event) => {
    try {
      const response = await Request.get(`${SERVER_URL}hnb/users/`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch company data:', error)
      return { error: 'Failed to fetch data' }
    }
  })
}
