import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png?react'
import useAuth from '../../services/useAuth'
import useLocalStorage from '../../services/useLocalStorage'
import useSalon from '../../services/useSalon'
import { selectRole, setAuth } from '../../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const SplashScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [temp, setTemp] = useState({})
  // const role = useSelector(selectRole)

  const { getData } = useLocalStorage()
  const { getSalonOfOwner } = useSalon()

  const [hasSalon, setHasSalon] = useState(null) // Use `null` for unknown state
  const [isLogin, setIsLogin] = useState(null) // Use `null` for unknown state

  const [moveAheas, setMoveAhead] = useState(false)

  const checkHasSalon = async () => {
    try {
      const cUser = await getData('cUser')
      const token = await getData('token')
      if (!cUser || Object.keys(cUser).length === 0) {
        setIsLogin(false)
        return
      }
      setTemp(cUser)
      dispatch(setAuth({ cUser, token }))
      setIsLogin(true)
      if (cUser.role == 'MT') {
        setHasSalon(true)
        return
      }
      try {
        const salon = await getSalonOfOwner(cUser.id)
        console.log('Fetched salon data:', salon)
        setHasSalon(!!salon) // Explicitly convert to boolean
        if (salon.error) {
          setHasSalon(false)
        }
      } catch (e) {
        console.error('Error fetching salon:', e)
        setHasSalon(false)
      }
    } catch (e) {
      console.error('Error retrieving user data:', e)
      setIsLogin(false)
    }
  }

  useEffect(() => {
    checkHasSalon()
    setTimeout(() => {
      setMoveAhead(true)
    }, 3000)
  }, [])

  // Separate useEffect to handle redirection after state updates
  useEffect(() => {
    if (moveAheas) {
      if (!isLogin) {
        navigate('signin')
      } else if (!hasSalon) {
        navigate('/salonCreate')
      } else {
        if (temp.role == 'MT') {
          console.log("MAINTAINER")
          navigate('/auth/bill')
        } else {
          console.log("sALON OWNERR")
          navigate('/auth/dashboard')
        }
      }
    }
  }, [isLogin, hasSalon, moveAheas])

  return (
    <div className="bg-gray-100 transition-colors w-full h-screen flex items-center justify-center">
      <div className="overflow-hidden">
        <div className="flex justify-center items-center bg-white pr-10">
          <div className="w-[300px] h-[300px] overflow-hidden animate-customOpacity">
            <img className="flex-1" src={Logo} alt="App Logo" />
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
