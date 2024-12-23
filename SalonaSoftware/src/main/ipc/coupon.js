import { coupon } from '../api'
import axios from 'axios'
import { getAllStoreData } from './store'
import Request from '../middleware/auth'

export const CouponApi = (ipcMain) => {
  ipcMain.handle('createCoupon', async (event, data) => {
    try {
      const response = await Request.post(coupon, data)
      return response
    } catch (e) {
      console.error(e)
      return e
    }
  })
  ipcMain.handle('getCoupons', async (event) => {
    try {
      const response = await Request.get(coupon);
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('getSalonCoupons', async (event) => {
    try {
      const response = await Request.get(coupon)
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('updateCoupons', async (event, { data, params }) => {
    try {
      const response = await Request.put(coupon, data)
      return response
    } catch (e) {
      return e
    }
  })
  ipcMain.handle('deleteCoupons', async (event, { data, params }) => {
    try {
      const response = await Request.delete(coupon, data)
      return response
    } catch (e) {
      return e
    }
  })
}
