import React, { useState, Fragment } from 'react'
import { toast } from 'react-toastify'
import { Listbox, Transition } from '@headlessui/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useService from '../../../services/useService'
import { serviceAddService } from '../../../slices/serviceSlice'

const CreateService = ({ setCreate }) => {
  const [vendor, setVendor] = useState({
    branch: -1,
    name: '',
    category: '',
    description: '',
    price: 0,
    duration: ''
  })
  const [category, setCategory] = useState('MEN')
  const selectBranch = useSelector((state) => state.branch.result)
  const [selected, setSelected] = useState(selectBranch[0])
  const { createService } = useService()
  const dispatch = useDispatch()

  const handleClose = () => {
    setCreate(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVendor({ ...vendor, [name]: value })
  }

  const handleSubmit = async () => {
    // Basic input validation can go here
    if (!vendor.name || !vendor.description || !vendor.price) {
      toast.warn('Please fill out all required fields')
      return
    }

    // Handle vendor creation logic here
    console.log(selectBranch)
    const temp = { ...vendor, branch: selected.id, category: category }
    console.log('Vendor details:', temp)
    const service = await createService(temp)
    console.log('This is the created service ', service)
    dispatch(serviceAddService(service))
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
              value={vendor.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Category</label>
            <Listbox value={category} onChange={setCategory}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-[10px] pl-3 pr-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{category}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full border-2 overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {['MEN', 'WOMEN'].map((person) => (
                      <Listbox.Option
                        key={person}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-2 pr-4 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ category }) => (
                          <>
                            <span
                              className={`block truncate ${
                                category ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person}
                            </span>
                            {category ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <FaChevronDown
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-full">
            <label className="block text-sm font-medium text-gray-900">Branch</label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left  border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.address}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {selectBranch.map((branch, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none p-2 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={branch}
                      >
                        <span
                          className={`block text-sm truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {branch.address}
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Price</label>
            <input
              type="number"
              name="price"
              min="1"
              value={vendor.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Duration {'(Hours)'}</label>
            <input
              type="number"
              name="duration"
              value={vendor.duration}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Description</label>
            <input
              type="text"
              name="description"
              value={vendor.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-black font-semibold bg-gold hover:bg-gold/90 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateService
