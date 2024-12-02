import { services } from '../api'
import axios from 'axios'
import { getAllStoreData } from './store'

export const ServiceApi = (ipcMain) => {
  ipcMain.handle('createServices', async (event, { data, params }) => {
    try {
      const allData = getAllStoreData();
      console.log("ALLL DATA",allData.data)
    //   const response = await axios.post(data)
    //   return response.data
    } catch (e) {
      console.error(e)
      return e
    }
  })
  ipcMain.handle('getServices', async (event, { data, params }) => {
    try {
      const response = await axios.get(services, data)
      return response.data
    } catch (e) {
      console.error(e)
      return e
    }
  })
  ipcMain.handle('updateServices', async (event, { data, params }) => {
    try {
      const response = await axios.put(services, data)
      return response.data
    } catch (e) {
      console.error(e)
      return e
    }
  })
  ipcMain.handle('deleteServices', async (event, { data, params }) => {
    try {
      const response = await axios.delete(services, data)
      return response.data
    } catch (e) {
      console.error(e)
      return e
    }
  })
}
