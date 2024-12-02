import axios from 'axios'

const SERVER_IP = 'http://127.0.0.1:8000/'

export function registerSalonHandlers(ipcMain) {

  ipcMain.handle('getSalon', async () => {
    try {
      const response = await axios.get(`${SERVER_IP}hnb/salon?salon_id=3`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch salon data:', error)
      return { error: 'Failed to fetch data' }
    }
  })

  ipcMain.handle('searchSalon', async ({ params, data }) => {
    try {
      const response = await axios.get(`${SERVER_IP}hnb/salon/`, { params })
      return response.data;
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  })

  ipcMain.handle('getNamesAndLocation', async ({ params, data }) => {
    try {
      const response = await axios.get(`${SERVER_IP}hnb/salon/`, { params })
      return response.data;
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  })
}
