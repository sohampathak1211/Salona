import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png?react'

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // window.electron.ipcRenderer.send('splash-loaded')
    setTimeout(() => {
      navigate('/auth')
    }, 3000)
  }, [])

  return (
    <div
      onClick={() => navigate('/auth')}
      className="bg-background transition-colors bg-red-400 w-full h-full flex items-center justify-center"
    >
      <div className="overflow-hidden">
        <div className="flex justify-center items-center bg-white pr-10">
          <div className="w-[300px] h-[300px] overflow-hidden animate-customOpacity">
            <img className="flex-1" src={Logo} />
          </div>
          <div className="text-8xl animate-leftRightOpacity">
            Hair<span className="font-bold">& Beauty</span>
          </div>
        </div>
        <div className="h-5 bg-black"></div>
      </div>
    </div>
  )
}

export default SplashScreen
