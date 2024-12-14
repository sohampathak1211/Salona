import React, { useState, Fragment } from 'react'
import { validateVendor } from '../../../utils/validators'
import { toast } from 'react-toastify'
import { Listbox, Transition } from '@headlessui/react'
import { FaChevronUp } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
]
const CreateService = ({ setCreate, create, fetchVendor }) => {
  const [selected, setSelected] = useState(people[0])
  const [vendor, setVendor] = useState({
    branch_id: -1,
    branch_name: '',
    name: '',
    category: '',
    description: '',
    price: '',
    duration: ''
  })

  //   {
  //     "branch":2,
  //     "name": "Facial",
  //     "category": "MALE",
  //     "description": "A standard men's haircut.",
  //     "price": 20.00,
  //     "duration": "1 Hour"
  // }

  const handleClose = () => {
    setCreate(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVendor({ ...vendor, [name]: value })
  }

  const handleSubmit = () => {
    // Basic input validation can go here
    if (!vendor.name || !vendor.description || !vendor.price) {
      toast.warn('Please fill out all required fields')
      return
    }

    // Handle vendor creation logic here
    console.log('Vendor details:', vendor)
    window.electron.ipcRenderer.invoke('CreateService', vendor).then((data) => {
      setVendor(data)
      fetchVendor()
      toast.success('Vendor created successfully')
    })
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
            <input
              type="text"
              name="category"
              value={vendor.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-full">
            <label className="block text-sm font-medium text-gray-900">Category</label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left  border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
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
                  <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none p-2 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        <span
                          className={`block text-sm truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {person.name}
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
              value={vendor.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Duration {'(Hours)'}</label>
            <input
              type="text"
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
