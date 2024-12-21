import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useSalon from '../../services/useSalon'
import { Link } from 'react-router-dom'
import useLocalStorage from '../../services/useLocalStorage'

const SalonCreation = () => {
  const { createSalon } = useSalon()
  const { getData } = useLocalStorage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    share_location: '',
    instagram_acc: '',
    facebook_acc: '',
    whatsapp_link: '',
    owner: -1
  })
  const validateFields = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.address || !formData.phone) {
        toast.info('Please fill all the fields in Step 1.')
        return false
      }

      // Phone validation
      const phoneRegex = /^\d{10}$/ // Modify as needed
      if (!phoneRegex.test(formData.phone)) {
        toast.error('Please enter a valid 10-digit phone number.')
        return false
      }
    }

    if (currentStep === 2) {
      if (!formData.email || !formData.description) {
        toast.info('Please fill all the fields in Step 2.')
        return false
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address.')
        return false
      }
    }

    if (currentStep === 3) {
      const urlRegex =
        /^(https?:\/\/)?([\w\d\-]+\.){1,2}[a-z]{2,}([\/\w\d\-._~:?#[\]@!$&'()*+,;=]*)?$/i

      if (formData.instagram_acc && !urlRegex.test(formData.instagram_acc)) {
        toast.error('Please enter a valid instagram_acc link.')
        return false
      }

      if (formData.share_location && !urlRegex.test(formData.share_location)) {
        toast.error('Please enter a valid Google link.')
        return false
      }

      if (formData.facebook_acc && !urlRegex.test(formData.facebook_acc)) {
        toast.error('Please enter a valid Facebook link.')
        return false
      }

      if (formData.whatsapp_link && !urlRegex.test(formData.whatsapp_link)) {
        toast.error('Please enter a valid Whatsapp link.')
        return false
      }
    }

    return true
  }

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.name || !formData.address || !formData.phone) {
        toast.info('Please fill all the fields in Step 1.')
        return
      }
    }
    if (currentStep === 2) {
      if (!formData.email || !formData.description) {
        toast.info('Please fill all the fields in Step 2.')
        return
      }
    }
    if (validateFields()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    const getOwner = async () => {
      const cUser = await getData('cUser')
      setFormData((prev) => {
        return { ...prev, owner: cUser.id }
      })
    }
    getOwner()
  }, [])

  const handleSend = async () => {
    try {
      console.log(formData)
      const response = await createSalon(formData)
      console.log('Salon creation', response)
      toast.success('Salon Successfully created')
    } catch (e) {
      console.log(e)
      toast.error('Error creating the salon')
    }
  }

  const stepClass = (step) =>
    `rounded-full w-10 h-10 flex items-center justify-center font-semibold ${
      step <= currentStep
        ? 'bg-gold text-white shadow-lg scale-110 transition-transform duration-300'
        : 'bg-gray-300 text-gray-700'
    }`

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white via-white to-yellow-100 text-gold p-5"
      // style={{
      //   backgroundImage: `url('https://img.freepik.com/premium-vector/seamless-pattern-white-gold-colors_109327-413.jpg')`,
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      // }}
    >
      {/* <ToastContainer /> */}
      <Link to="/auth">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gold/90">Create a Salon</h1>
      </Link>

      {/* Step Indicators */}
      <div className="flex items-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center space-x-2">
            <div className={stepClass(step)}>{step}</div>
            {step < 3 && (
              <div
                className={`w-10 h-1 ${step < currentStep ? 'bg-gold' : 'bg-gray-300'} rounded-full`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        {/* Step 1 */}
        <div
          className={`transition-opacity duration-500 ${
            currentStep === 1 ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Step 1: Salon Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Salon Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="text"
            name="address"
            placeholder="Salon Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Step 2 */}
        <div
          className={`transition-opacity duration-500 ${
            currentStep === 2 ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Step 2: Contact Info</h2>
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold h-32"
          />
        </div>

        {/* Step 3 */}
        <div
          className={`transition-opacity duration-500 ${
            currentStep === 3 ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Step 3: Social Media</h2>
          <input
            type="text"
            name="instagram_acc"
            placeholder="Instagram Link"
            value={formData.instagram_acc}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="text"
            name="facebook_acc"
            placeholder="Facebook Link"
            value={formData.facebook_acc}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="text"
            name="whatsapp_link"
            placeholder="WhatsApp Link"
            value={formData.whatsapp_link}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="text"
            name="share_location"
            placeholder="Google Map Link"
            value={formData.share_location}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-gold/80 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSend}
              className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-gold/80 transition-colors"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalonCreation
