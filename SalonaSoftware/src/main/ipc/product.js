import { product } from '../api'
import Request from '../middleware/auth'

export const ProductApi = (ipcMain) => {
  ipcMain.handle('getSalonProducts', async (event, params) => {
    try {
      const response = await Request.get(product, { params })
      return response
    } catch (e) {
      return e
    }
  })

  ipcMain.handle('createProduct', async (e, data) => {
    try {
      const response = await Request.post(product, data)
      return response
    } catch (e) {
      return e
    }
  })
}
