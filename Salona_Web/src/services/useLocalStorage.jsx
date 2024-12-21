import React from 'react'

// data
// userInfo
// salons
// currentSalonIndex

const useLocalStorage = () => {
  const getData = (key) => {
    return window.electron.ipcRenderer.invoke('getAppData', key)
  }
  const setData = (key, value) => {
    return window.electron.ipcRenderer.invoke('setAppData', { key, value })
  }
  const clearData = (key) => {
    const cleaned = window.electron.ipcRenderer
      .invoke(key, {})
      .then((d) => d)
      .catch((e) => e)
    return cleaned
  }
  return { getData, setData, clearData }
}

export default useLocalStorage
