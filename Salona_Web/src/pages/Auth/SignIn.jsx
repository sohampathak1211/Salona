import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Both from '../../assets/hairfemale3.jpg?react'
import { toast } from 'react-toastify'
import useAuth from '../../services/useAuth'
import useLocalStorage from '../../services/useLocalStorage'
import Logo from '../../assets/logo.png?react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../slices/authSlice'

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { salonSignIn, maintainerSignIn } = useAuth()
  const { setData } = useLocalStorage()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  const validateForm = () => {
    if (!email) {
      setError('Email is required.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (!password) {
      setError('Password is required.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      if (admin) {
        const res = await salonSignIn({ email, password, action: 'signin' })
        console.log('data from the backend for user', res)
        if (res.error) {
          toast.info(res.error.error)
          return
        }
        toast.success(res.message)
        setData('cUser', res.cUser)
        setData('token', res.token)
        dispatch(setAuth(res))
        if (res.cUser.salon_id == -1) {
          navigate('/salonCreate')
        } else {
          navigate('/auth/dashboard')
        }
      } else {
        const res = await maintainerSignIn({ email, password, action: 'signin' })
        console.log('Responsese sefefdf', res.error)
        if (res.error) {
          toast.info(res.error.error)
          return
        }
        // if(!res.so_enable) {
        //   toast.info('Your account is disabled. Please contact the Salon Owner.')
        //   return
        // }
        toast.success(res.message)
        setData('cUser', res.cUser)
        setData('token', res.token)
        navigate('/auth/bill')
      }
    } catch (err) {
      toast.error(err)
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${Both})` }}
      >
        <div className="bg-black bg-opacity-30 w-full h-full"></div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-16 lg:p-24 bg-white">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl text-nowrap font-bold text-gray-800 mb-6 py-2 pr-4">
            Nice to see you again
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className=" mb-4 flex items-center">
            <div className="w-24 h-24">
              <img src={Logo} />
            </div>
            <div className="ml-5">
              <h2 className="text-xl font-semibold">Salon Name</h2>
              <p className="text-sm text-gray-500">
                CIDCO BRANCH , PLot 21 , Aurangabad,CIDCO BRANCH , PLot 21 , Aurangabad
              </p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email or phone number</label>
            <input
              type="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="w-full flex justify-between items-center mb-6">
            {/* <p className="mt-4 text-sm text-center text-gray-500">
              <Link to="/auth">Don’t have an account?</Link>
              {admin ? (
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up now
                </Link>
              ) : (
                <Fragment />
              )}
            </p> */}
            <div className="w-[calc(100%-60px)] flex items-center mt-2">
              <Link to="/salonCreate" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
              <div className="w-[64px] ml-auto">
                <label className="relative font-bold text-gray-400 flex text-nowrap justify-between items-center group p-2 text-md">
                  Admin
                  <input
                    type="checkbox"
                    className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                    onChange={(e) => setAdmin(e.target.checked)}
                  />
                  <span className="w-full h-[26px] flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-400 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1"></span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
