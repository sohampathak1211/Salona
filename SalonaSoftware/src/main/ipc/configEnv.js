export function registerEnv(ipcMain) {
  ipcMain.handle('getEnv', (event, key) => {
    try {
      switch (key) {
        case 'SALON_ID':
          return process.env.SALON_ID && 'Did not find'
        case 'BRANCH_ID':
          return process.env.BRANCH_ID && 'Did not find'
        case 'SERVER_URL':
          return process.env.SERVER_URL && 'Did not find'
        default:
          return 'Did not find'
      }
    } catch (error) {
      console.error('Failed to set app data:', error)
      return { success: false }
    }
  })
}
