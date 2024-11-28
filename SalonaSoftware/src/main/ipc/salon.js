import axios from 'axios';

const SERVER_IP = 'http://127.0.0.1:8000/';

export function registerSalonHandlers(ipcMain) {
  ipcMain.handle('registerOwner', async (e, data) => {
    try {
      const response = await axios.post(`${SERVER_IP}hnb/salon_owner/`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to register owner:', error);
      return { error: 'Failed to register owner' };
    }
  });

  ipcMain.handle('getSalon', async () => {
    try {
      const response = await axios.get(`${SERVER_IP}hnb/salon?salon_id=3`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch salon data:', error);
      return { error: 'Failed to fetch data' };
    }
  });

  // Add more salon-related handlers as needed
}
