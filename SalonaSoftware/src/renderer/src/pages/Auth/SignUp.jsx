import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Both from '../../assets/both.jpg?react'
import { validateName, validateEmail, validatePhone, validatePassword } from '../../validator/user'

export default function SignUp() {
  const [owner, setOwner] = useState({
    name: '',
    password: '',
    email: '',
    phone: ''
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOwner({ ...owner, [name]: value })
  }

  const handleSignUp = (e) => {
    e.preventDefault()

    // Validation
    const nameError = validateName(owner.name)
    const emailError = validateEmail(owner.email)
    const phoneError = validatePhone(owner.phone)
    const passwordError = validatePassword(owner.password)

    if (nameError || emailError || phoneError || passwordError) {
      setErrors({ name: nameError, email: emailError, phone: phoneError, password: passwordError })
      return
    }

    // Reset errors
    setErrors({})

    // Send validated data to the backend
    const payload = { ...owner , action:"signup" }
    window.electron.ipcRenderer
      .invoke('registerOwner', payload)
      .then((data) => {
        console.log(data)
        navigate("/auth")
      }).then(nav=>{
        
      })
      .catch((e) => console.log(e))
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Register as a Salon Owner</h1>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={owner.name}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={owner.email}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={owner.phone}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={owner.password}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            onClick={handleSignUp}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign up
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign in now
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
