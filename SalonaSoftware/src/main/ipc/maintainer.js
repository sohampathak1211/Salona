import { maintainer } from '../api'
import Request from '../middleware/auth'

export const MaintainerApi = (ipcMain) => {
  ipcMain.handle('getMaintainer', async (event) => {
    try {
      const response = await Request.get(maintainer)
      return response
    } catch (e) {
      return e
    }
  })

  ipcMain.handle('createMaintainer', async (e, data) => {
    try {
      const response = await Request.post(maintainer, data)
      return response
    } catch (e) {
      return e
    }
  })
}
