import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { toast, ToastContainer } from 'react-toastify'
import WebView from '../pages/Music/WebView'
import useLocalStorage from '../services/useLocalStorage'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../slices/authSlice'
import { branchReset } from '../slices/branchSlice'
import { couponReset } from '../slices/couponSlice'
import { serviceReset } from '../slices/serviceSlice'
import { comboReset } from '../slices/comboSlice'
import { maintainerReset } from '../slices/maintainerSlice'
const SidebarLayout = () => {
  const [sidebar, setSidebar] = useState(true)
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const { setData } = useLocalStorage()
  console.log(location)
  console.log(visible)
  useEffect(() => {
    const parts = location.pathname.split('/')
    const lastPart = parts[parts.length - 1]
    if (lastPart == 'music') {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location.pathname])

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      dispatch(clearAuth())
      dispatch(branchReset())
      dispatch(couponReset())
      dispatch(serviceReset())
      dispatch(comboReset())
      dispatch(maintainerReset())
      await setData('cUser', {})
      await setData('token', {})
      toast.success('Successfully logged out')
      navigate('/signin')
    } catch (e) {
      toast.error('Error loggin out')
    }
  }

  useEffect(() => {
    // Listen for 'unauthorized' messages from the main process
    window.electron.ipcRenderer.on('unauthorized', (_, message) => {
      toast.error(message || 'Session expired. Please log in again.')
      handleLogout() // Redirect to the sign-in page
    })

    // Clean up the listener on component unmount
    return () => {
      window.electron.ipcRenderer.removeAllListeners('unauthorized')
    }
  }, [navigate])

  return (
    <div className="w-full h-screen flex flex-1 justify-center">
      {/* <ToastContainer
        position="top-left"
        autoClose={1500}
      /> */}
      <div className="w-full flex">
        <div
          className={`transition-all duration-500 ${sidebar ? 'w-[220px]' : 'w-[60px]'} max-w-[200px] max-h-screen`}
        >
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="w-full  h-screen flex flex-1 flex-col overflow-hidden bg-gray-50">
          <div className="w-full relative h-screen flex-1 custom-scrollbar overflow-y-scroll">
            <Outlet />
            <div
              className={`w-full h-screen bg-gray-700 absolute top-0 left-0 ${visible ? 'visible h-full' : 'hidden opacity-0'}`}
            >
              <WebView visible={visible} setVisible={setVisible} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarLayout
