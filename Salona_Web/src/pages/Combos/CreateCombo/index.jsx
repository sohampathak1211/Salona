import React, { useState, useEffect, Fragment } from 'react'
import { toast } from 'react-toastify'
import { Listbox, Transition } from '@headlessui/react'
import { FaChevronUp } from 'react-icons/fa'
import { ImCheckmark } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import useService from '../../../services/useService'
import useCombo from '../../../services/useCombo'
import { comboAddCombo } from '../../../slices/comboSlice'

const CreateCombo = ({ setCreate }) => {
  const [combos, setCombos] = useState({
    branch: -1,
    name: '',
    category: '',
    duration: '',
    description: '',
    price: '',
    services: []
  })

  const selectBranch = useSelector((state) => state.branch.result)
  const selectService = useSelector((state) => state.service.result)

  const [selectedBranch, setSelectedBranch] = useState(selectBranch[0])
  const [availableServices, setAvailableServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const { createService } = useService()
  const { createCombo } = useCombo()
  const dispatch = useDispatch()

  // Update available services when the branch changes
  useEffect(() => {
    const filteredServices = selectService.filter(
      (service) => service.branch.id === selectedBranch.id
    )
    setAvailableServices(filteredServices)
    setSelectedServices([]) // Reset selected services when branch changes
  }, [selectedBranch, selectService])

  const handleClose = () => {
    setCreate(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'price' && value < 0) {
      toast.error('Price must be a positive value')
      return
    }
    if (name === 'price' && value === '-') {
      toast.error('Price must be a positive value')
      return
    }
    setCombos({ ...combos, [name]: value })
  }

  const handleServiceToggle = (service) => {
    setSelectedServices(
      (prev) =>
        prev.includes(service)
          ? prev.filter((s) => s.id !== service.id) // Remove if already selected
          : [...prev, service] // Add if not selected
    )
  }

  const handleSubmit = async () => {
    if (!combos.name || !combos.description || !combos.price || selectedServices.length === 0) {
      toast.warn('Please fill out all required fields')
      return
    }

    const service_ids = selectedServices.map((item) => item.id)

    const payload = {
      ...combos,
      branch: selectedBranch.id,
      services: service_ids
    }

    console.log('Combo details:', payload)
    const response = await createCombo(payload)
    console.log('Created combo:', response)
    dispatch(comboAddCombo(response))
    handleClose()
  }

  return (
    <div className="p-4 md:p-5 space-y-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Name</label>
            <input
              type="text"
              name="name"
              value={combos.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Price</label>
            <input
              type="number"
              name="price"
              min="0" // Ensures the price cannot be negative or zero
              step="0.01" // Allows decimal input
              value={combos.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Branch</label>
          <Listbox value={selectedBranch} onChange={setSelectedBranch}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold">
                <span className="block truncate">{selectedBranch?.address || 'Select Branch'}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5">
                  {selectBranch.map((branch) => (
                    <Listbox.Option
                      key={branch.id}
                      value={branch}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 px-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {branch.address}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div>
          <div className="flex gap-4 mt-2">
            <div className="flex-1">
              <h4 className="font-medium text-gray-700 mb-2">Available Services</h4>
              <div className="flex flex-wrap gap-2">
                {availableServices
                  .filter((service) => !selectedServices.includes(service))
                  .map((service) => (
                    <div
                      key={service.id}
                      className="p-2 border rounded-2xl text-center text-xs font-semibold cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all"
                      onClick={() => handleServiceToggle(service)}
                    >
                      {service.name}
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-gray-700 mb-2">Selected Services</h4>
              <div className="flex flex-wrap gap-2">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-2 border rounded-2xl text-center text-xs font-semibold cursor-pointer bg-gold text-black hover:bg-gold/90 transition-all flex items-center gap-1"
                    onClick={() => handleServiceToggle(service)}
                  >
                    <ImCheckmark className="text-green-600" /> {service.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900">Description</label>
          <textarea
            name="description"
            value={combos.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
            rows="3"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-black font-semibold bg-gold hover:bg-gold/90 rounded-lg text-sm px-5 py-2.5"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCombo
