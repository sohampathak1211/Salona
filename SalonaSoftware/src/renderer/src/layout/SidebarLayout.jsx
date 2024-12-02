import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { ToastContainer } from 'react-toastify'
import WebView from '../pages/Music/WebView'
const SidebarLayout = () => {
  const [sidebar, setSidebar] = useState(true)
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const location  = useLocation();
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
              className={`w-full h-[calc(100vh - 20%)] bg-cyan-500 absolute top-0 left-0 ${visible ? 'visible h-full' : 'hidden opacity-0'}`}
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
