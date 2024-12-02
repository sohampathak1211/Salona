let Store
let store
;(async () => {
  Store = (await import('electron-store')).default
  store = new Store()
  console.log('Here I am the store', store)
})()

export function registerStoreHandlers(ipcMain) {
  ipcMain.handle('setAppData', (event, { key, value }) => {
    try {
      store.set(key, value)
      return { success: true }
    } catch (error) {
      console.error('Failed to set app data:', error)
      return { success: false }
    }
  })

  ipcMain.handle('getAppData', (event, key) => {
    try {
      return store.get(key)
    } catch (error) {
      console.error('Failed to get app data:', error)
      return {}
    }
  })
}

export const getAllStoreData = () => {
  try {
    return store.store
  } catch (error) {
    console.error('Failed to get all store data:', error)
    return {}
  }
}

export const getData = (key) => {
  try {
    return store.get(key)
  } catch (e) {
    console.error('Failed to get app data:', e)
    return {}
  }
}
