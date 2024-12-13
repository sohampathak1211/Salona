import React from 'react'
const useEnv = () => {
  const getEnv = (key) => {
    return window.electron.ipcRenderer.invoke('getAppData', key)
  }
  return { getEnv }
}

export default useEnv
