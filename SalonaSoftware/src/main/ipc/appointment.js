import axios from 'axios';

export function registerAppointmentHandlers(ipcMain) {
  ipcMain.handle('getAppointments', async () => {
    try {
      const response = await axios.get('your-appointment-endpoint');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      return { error: 'Failed to fetch appointments' };
    }
  });

  // Add more appointment-related handlers as needed
}
