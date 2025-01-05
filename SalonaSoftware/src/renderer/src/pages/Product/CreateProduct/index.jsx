import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import useProduct from '../../../services/useProduct'
import { toast } from 'react-toastify'
import { FaChevronDown } from 'react-icons/fa6'

const CreateProduct = ({ productRefetch, setCreate }) => {
  const selectBranch = useSelector((state) => state.branch.result)
  const [selectedBranch, setSelectedBranch] = useState(selectBranch[0])
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    gender: '',
    expiry_date: '',
    description: ''
  })
  const { createProduct } = useProduct()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    const payload = {
      ...formData,
      branch: selectedBranch.id
    }
    const data = await createProduct(payload)
    console.log('Product Data:', data)
    if (data.error) {
      toast.error(data.error)
      return
    }
    productRefetch()
    setCreate(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-bold mb-1">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="brand" className="text-sm font-bold mb-1">
          Brand
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm font-bold">
          Category
        </label>
        <Listbox
          value={formData.category}
          onChange={(value) => setFormData({ ...formData, category: value })}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default bg-white py-[8px] pl-3 pr-10 text-left border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold">
              <span className="block truncate">{formData.category || 'Select Category'}</span>
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
              <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5">
                {['Eyes', 'Skin', 'Lips', 'Hair', 'Face', 'Ears', 'Other'].map((category, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={category}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 px-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                  >
                    {category}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm font-bold mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity" className="text-sm font-bold mb-1">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="gender" className="text-sm font-bold mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="expiry_date" className="text-sm font-bold mb-1">
          Expiry Date
        </label>
        <input
          type="date"
          id="expiry_date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Branch</label>
        <Listbox value={selectedBranch} onChange={setSelectedBranch}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold">
              <span className="block truncate">{selectedBranch?.address || 'Select Branch'}</span>
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

      <div className="flex flex-col col-span-2">
        <label htmlFor="description" className="text-sm font-bold mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded-md"
        ></textarea>
      </div>

      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          className="text-black bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
        >
          Add Product
        </button>
      </div>
    </form>
  )
}

export default CreateProduct
