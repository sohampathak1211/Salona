import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Both from '../../assets/hairfemale3.jpg?react'
import useUsers from '../../services/useUsers'
import { toast } from 'react-toastify'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { salonSignIn } = useUsers()
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
      const res = salonSignIn({ email, password, action: 'signin' })
      console.log('data from the backend for user', res.data)
      toast.success(res.message)
    } catch (err) {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nice to see you again</h1>

        <form onSubmit={handleSubmit}>
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
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Remember me</span>
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

          <div className="flex items-center my-4">
            <div className="w-full border-t border-gray-300"></div>
            <Link to="/auth" className="px-2 text-sm text-gray-400">
              Or sign in with Google
            </Link>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <button className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
            Sign in with Google
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
