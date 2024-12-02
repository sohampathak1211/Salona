import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Both from '../../assets/hairfemale3.jpg?react'
import { toast } from 'react-toastify'
import useAuth from '../../services/useAuth'
import useSalon from '../../services/useSalon'
import { FaChevronDown } from 'react-icons/fa'
import { FaChevronUp } from 'react-icons/fa'

export default function SignIn() {
  const navigate = useNavigate()
  const { salonSignIn } = useAuth()
  const { getNamesAndLocation } = useSalon()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  const [selectedSalon, setSelectedSalon] = useState('')
  const [salons, setSalons] = useState(null)
  const [open, setOpen] = useState(false)

  const [selectedBranch, setSelectedBranch] = useState('')
  const [branches, setBranches] = useState(null)
  const [branchOpen, setBranchOpen] = useState(false)
  console.log(admin)
  useEffect(() => {
    // Fetch salons from the backend
    const fetchSalons = async () => {
      try {
        const response = await getNamesAndLocation()
        console.log('Response', response)
        setSalons([...response, ...response, ...response, ...response])
      } catch (error) {
        console.error('Error fetching salons:', error)
        toast.error('Failed to load salons.')
      }
    }

    fetchSalons()
  }, [])

  useEffect(() => {
    // Fetch salons from the backend
    const fetchBranches = async () => {
      try {
        const response = await getNamesAndLocation()
        console.log('Response', response)
        setBranches([...response, ...response, ...response, ...response])
      } catch (error) {
        console.error('Error fetching salons:', error)
        toast.error('Failed to load salons.')
      }
    }

    fetchBranches()
  }, [])

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
      const res = await salonSignIn({ email, password, salon: selectedSalon, action: 'signin' })
      console.log('data from the backend for user', res)
      if (res.error) {
        toast.info(res)
        return;
      }
      toast.success(res.message)
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
          <div className="w-[400px] flex mt-2">
            <div className="w-[64px] mr-16 ml-auto">
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

        <form onSubmit={handleSubmit}>
          <div className={`mb-4 ${admin ? 'hidden' : 'visible'}`}>
            <label className="block text-gray-700 mb-2">Search your Salon</label>
            <div className="relative w-full min-w-[200px]">
              <div className="w-full flex border-2 rounded-lg justify-between items-center">
                <h2 className="px-2">{selectedSalon ? selectedSalon.name : 'No Salon Selected'}</h2>
                <div
                  className="bg-gray-200 rounded-r-lg p-4"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {open ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div className="absolute z-40 top-12 left-0 bg-white max-h-28 overflow-y-scroll w-full border-2">
                {salons?.length > 0 &&
                  open &&
                  salons.map((item) => (
                    <h2
                      onClick={() => {
                        setSelectedSalon(item)
                        setOpen(false)
                      }}
                      className="text-black border-y-[1px] z-50 bg-white border-gray-100/80 hover:bg-gray-100 w-full p-2"
                      key={item.id}
                    >
                      {item.name}
                    </h2>
                  ))}
              </div>
            </div>
          </div>
          <div className={`mb-4 -z-30 ${admin ? 'hidden' : 'visible'}`}>
            <label className="block text-gray-700 mb-2">Search your Branch</label>
            <div className="relative bg-white w-full min-w-[200px]">
              <div className="w-full bg-white flex border-2 rounded-lg justify-between items-center">
                <h2 className="px-2 bg-white">
                  {selectedBranch ? selectedBranch.name : 'No Salon Branch'}
                </h2>
                <div
                  className="bg-gray-200 rounded-r-lg p-4"
                  onClick={() => setBranchOpen((prev) => !prev)}
                >
                  {branchOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div className="absolute bg-white max-h-28 overflow-y-scroll top-12 left-0 w-full border-2">
                {branches?.length > 0 &&
                  branchOpen &&
                  branches.map((item) => (
                    <h2
                      onClick={() => {
                        setSelectedBranch(item)
                        setBranchOpen(false)
                      }}
                      className="text-black border-y-[1px] bg-white border-gray-100/80 hover:bg-gray-100 w-full p-2"
                      key={item.id}
                    >
                      {item.name}
                    </h2>
                  ))}
              </div>
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

          <div className="flex items-center mb-6">
            <p className="mt-4 text-sm text-center text-gray-500">
              <Link to="/auth">Don’t have an account?</Link>
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up now
              </Link>
            </p>
            <a href="#" className="ml-auto text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
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
