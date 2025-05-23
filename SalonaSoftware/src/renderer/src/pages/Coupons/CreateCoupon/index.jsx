import React, { useState, Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Listbox, Switch, Transition } from '@headlessui/react'
import { FaChevronUp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useService from '../../../services/useService'
import { ImCheckmark } from 'react-icons/im'
import useCoupon from '../../../services/useCoupon'
import { couponAddCoupon } from '../../../slices/couponSlice'

const CreateCoupon = ({ setCreate }) => {
  const [coupon, setCoupon] = useState({
    branch: null,
    code: '',
    by_percent: true,
    discount_percentage: 0,
    discount_amount: 0,
    valid_services: [],
    valid_combos: [],
    valid_till: '',
    minimum_amount: 0
  })

  const selectBranch = useSelector((state) => state.branch.result)
  const selectServices = useSelector((state) => state.service.result)
  const selectCombos = useSelector((state) => state.combo.result)
  const [selectedBranch, setSelectedBranch] = useState(selectBranch[0])
  const [availableServices, setAvailableServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [availableCombos, setAvailableCombos] = useState([])
  const [selectedCombos, setSelectedCombos] = useState([])
  const [enabled, setEnabled] = useState(true)
  const [is_minimum_purchase, setIsMinimumPurchase] = useState(true)

  const [couponType, setType] = useState('services')

  const { createCoupon } = useCoupon()
  const dispatch = useDispatch()

  useEffect(() => {
    setCoupon((prev) => ({
      ...prev,
      valid_services: [],
      valid_combos: [],
      minimum_amount: 0
    }))
    setSelectedServices([])
    setSelectedCombos([])
    if (couponType === 'minimumPurchase') {
      setIsMinimumPurchase(true)
    } else {
      setIsMinimumPurchase(false)
    }
  }, [couponType])

  useEffect(() => {
    const filteredServices = selectServices.filter(
      (service) => service.branch.id === selectedBranch.id
    )
    const filteredCombos = selectCombos.filter((combo) => combo.branch.id === selectedBranch.id)

    setAvailableServices(filteredServices)
    setAvailableCombos(filteredCombos)
    setSelectedServices([])
    setSelectedCombos([])
  }, [selectedBranch, selectServices, selectCombos])

  useEffect(() => {
    setCoupon((prev) => ({
      ...prev,
      discount_percentage: 0,
      discount_amount: 0
    }))
  }, [enabled])

  const handleClose = () => {
    setCreate(false)
  }

  const handleDiscountChange = (e) => {
    if (enabled) {
      setCoupon({ ...coupon, discount_percentage: e.target.value })
    } else {
      setCoupon({ ...coupon, discount_amount: e.target.value })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCoupon({ ...coupon, [name]: value })
  }

  const handleSubmit = async () => {
    console.log(selectedBranch)
    if (!coupon.code || !coupon.valid_till) {
      toast.warn('Please fill out all required fields')
      return
    }

    if (!enabled && coupon.discount_amount <= 0) {
      toast.warn('Discount amount must be greater than 0')
      return
    }

    if (enabled && (coupon.discount_percentage <= 0 || coupon.discount_percentage > 100)) {
      toast.warn('Discount percentage must be between 1 and 100')
      return
    }

    const payload = {
      ...coupon,
      is_minimum_purchase: is_minimum_purchase,
      by_percent: enabled,
      branch: selectedBranch.id,
      valid_services: selectedServices.map((service) => service.id),
      valid_combos: selectedCombos.map((combo) => combo.id)
    }

    console.log('Coupon details:', payload)
    const response = await createCoupon(payload)
    dispatch(couponAddCoupon(response))
    console.log('Created coupon:', response)
    handleClose()
  }

  const handleServiceToggle = (service) => {
    setSelectedServices(
      (prev) =>
        prev.includes(service)
          ? prev.filter((s) => s.id !== service.id) // Remove if already selected
          : [...prev, service] // Add if not selected
    )
  }
  const handleComboToggle = (service) => {
    setSelectedCombos(
      (prev) =>
        prev.includes(service)
          ? prev.filter((s) => s.id !== service.id) // Remove if already selected
          : [...prev, service] // Add if not selected
    )
  }

  const [placeholder, setPlaceholder] = useState('Enter the percentage')

  useEffect(() => {
    if (enabled) {
      setCoupon({ ...coupon, discount_amount: 0 })
      setPlaceholder('Enter the percentage')
    } else {
      setCoupon({ ...coupon, discount_percentage: 0 })
      setPlaceholder('Enter the amount')
    }
  }, [enabled])

  return (
    <div className="p-4 md:p-5 bg-white space-y-4 min-h-[480px]">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Code</label>
            <input
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Valid Till</label>
            <input
              type="datetime-local"
              name="valid_till"
              value={coupon.valid_till}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
              required
            />
          </div>
        </div>

        <div className="w-full flex gap-4">
          {/* Heading for Buttons and Input Field */}

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-900 mb-1">Select One</label>
            <div className="flex items-center gap-4">
              {/* Buttons and Input Field */}
              <div className="flex items-center flex-1">
                <div className="bg-gray-200 flex rounded-md z-50 p-1 mr-2">
                  <h2
                    onClick={() => setEnabled(true)}
                    className={`px-3 py-2 ${
                      enabled
                        ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default'
                        : 'cursor-pointer'
                    }`}
                  >
                    %
                  </h2>
                  <h2
                    onClick={() => setEnabled(false)}
                    className={`px-3 py-2 ${
                      !enabled
                        ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default'
                        : 'cursor-pointer'
                    }`}
                  >
                    ₹
                  </h2>
                </div>
                <div className="flex-grow">
                  <input
                    type="number"
                    onChange={handleDiscountChange}
                    value={enabled ? coupon.discount_percentage : coupon.discount_amount}
                    placeholder={placeholder}
                    className="w-full h-[46px] border border-gray-400 rounded-md px-2 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Branch Selector */}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-900 mb-1">Branch</label>
            <Listbox value={selectedBranch} onChange={setSelectedBranch}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left border border-gray-300 rounded-md">
                  <span className="block truncate">
                    {selectedBranch?.address || 'Select a Branch'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronUp className="h-5 w-5 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment}>
                  <Listbox.Options className="absolute mt-1 z-50 max-h-40 w-full overflow-auto rounded-md bg-white py-1">
                    {selectBranch.map((branch) => (
                      <Listbox.Option key={branch.id} value={branch}>
                        {branch.address}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className=" w-full flex justify-between">
          <div className="bg-gray-200 flex rounded-md z-50 p-1">
            <h2
              onClick={() => setType('services')}
              className={`px-2 py-1 ${couponType === 'services' ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Services
            </h2>
            <h2
              onClick={() => setType('combos')}
              className={`px-2 py-1 ${couponType === 'combos' ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Combos
            </h2>
            <h2
              onClick={() => setType('minimumPurchase')}
              className={`px-2 py-1 ${couponType === 'minimumPurchase' ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Minimum Purchase
            </h2>
          </div>
        </div>

        {couponType == 'minimumPurchase' ? (
          <Fragment>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Minimum Purchase Order
              </label>
              <input
                type="number"
                name="minimum_amount"
                value={coupon.minimum_amount}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
                required
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {couponType == 'services' ? (
              <div className="">
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-700 mb-2">Available Services</h4>
                    <div className="flex h-[200px] overflow-y-scroll flex-wrap gap-2">
                      {availableServices
                        .filter((service) => !selectedServices.includes(service))
                        .map((service) => (
                          <div
                            key={service.id}
                            className="h-8 p-2 border rounded-2xl text-center text-xs font-semibold cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all"
                            onClick={() => handleServiceToggle(service)}
                          >
                            {service.name}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex-1  ">
                    <h4 className="font-medium text-gray-700 mb-2">Selected Services</h4>
                    <div className="flex h-[200px] overflow-y-scroll flex-wrap gap-2">
                      {selectedServices.map((service) => (
                        <div
                          key={service.id}
                          className="p-2 h-8 border rounded-2xl text-center text-xs font-semibold cursor-pointer bg-gold text-black hover:bg-gold/90 transition-all flex items-center gap-1"
                          onClick={() => handleServiceToggle(service)}
                        >
                          <ImCheckmark className="text-green-600" /> {service.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-700 mb-2">Available Combos</h4>
                    <div className="flex h-[200px] overflow-y-scroll flex-wrap gap-2">
                      {availableCombos
                        .filter((service) => !selectedCombos.includes(service))
                        .map((service) => (
                          <div
                            key={service.id}
                            className="p-2 h-8 border rounded-2xl text-center text-xs font-semibold cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all"
                            onClick={() => handleComboToggle(service)}
                          >
                            {service.name}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium text-gray-700 mb-2">Selected Combos</h4>
                    <div className="flex h-[200px] overflow-y-scroll flex-wrap gap-2">
                      {selectedCombos.map((service) => (
                        <div
                          key={service.id}
                          className="p-2 h-8 border rounded-2xl text-center text-xs font-semibold cursor-pointer bg-gold text-black hover:bg-gold/90 transition-all flex items-center gap-1"
                          onClick={() => handleComboToggle(service)}
                        >
                          <ImCheckmark className="text-green-600" /> {service.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}

        <div
          className={`flex justify-end space-x-4 ${couponType == 'minimumPurchase' ? 'pt-[180px]' : ''}`}
        >
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm px-5 py-2.5"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-black bg-gold hover:bg-gold/90 rounded-lg text-sm px-5 py-2.5"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCoupon
