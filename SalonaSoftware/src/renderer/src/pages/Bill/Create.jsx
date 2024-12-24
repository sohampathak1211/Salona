import React, { useState } from 'react'
import { Listbox  } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { selectService } from '../../slices/serviceSlice'
import { selectCombo } from '../../slices/comboSlice'
import { selectBranch } from '../../slices/branchSlice'
import { Menu } from '@headlessui/react';
import { Combobox } from '@headlessui/react'


const CreateBill = () => {
  const branches = useSelector(selectBranch)
  const services = useSelector(selectService)
  const combos = useSelector(selectCombo)
  const products = useSelector((state) => state.coupon.result)

  console.log('Branches:', branches)
  console.log('Services:', services)
  console.log('Combos:', combos)
//   console.log('Products:', products)

  const [selectedBranch, setSelectedBranch] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [coupon, setCoupon] = useState(null)
  const [items, setItems] = useState([{ type: '', item: null, quantity: 1, price: 0, total: 0 }])

  const addItem = () => {
    setItems([...items, { type: '', item: null, quantity: 1, price: 0, total: 0 }])
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items]
    updatedItems[index][field] = value

    if (field === 'item' && value) {
      updatedItems[index].price = value.price || 0
    }

    updatedItems[index].total = updatedItems[index].price * updatedItems[index].quantity || 0

    setItems(updatedItems)
  }

  const calculateGrandTotal = () => items.reduce((sum, item) => sum + item.total, 0).toFixed(2)

  const [query, setQuery] = useState('')

  // Determine the items based on the selected type
  const filteredOptions =
    items.type === 'Service'
      ? services
      : items.type === 'Combo'
      ? combos
      : products

  // Filter options based on the search query
  const displayedOptions = query === ''
    ? filteredOptions
    : filteredOptions.filter((opt) =>
        opt.name.toLowerCase().includes(query.toLowerCase())
      )


  const handleSubmit = (e) => {
    e.preventDefault()
    const billData = {
      branch: selectedBranch,
      customerName,
      contactNumber,
      coupon,
      items,
      total: calculateGrandTotal()
    }
    console.log('Bill Data:', billData)
  }

  const coupons = ['DISCOUNT10', 'SALE20', 'WELCOME5'];
  const [searchTerm, setSearchTerm] = useState(''); // Renamed state for query
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const filteredCoupons = searchTerm === ''
  ? coupons
  : coupons.filter((coupon) =>
      coupon.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded-lg shadow-md space-y-6">
      {/* Branch Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Branch</label>
        <Listbox value={selectedBranch} onChange={setSelectedBranch}>
          <Listbox.Button className="w-full p-2 border rounded-md">
            {selectedBranch ? selectedBranch.name : 'Select Branch'}
          </Listbox.Button>
          <Listbox.Options className="border rounded-md mt-1 bg-white">
            {branches.map((branch) => (
              <Listbox.Option key={branch.id} value={branch}>
                {branch.address}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      {/* Customer Details */}
      <div>
        <label className="block text-sm font-medium mb-1">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter customer name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contact Number</label>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter contact number"
          required
        />
      </div>

      {/* Items Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Items</h3>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-3">
            {/* Type Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
  {({ open }) => (
    <>
      <div>
        <Menu.Button className="p-2 border rounded-md w-40 bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 flex items-center justify-between">
          {item.type || 'Select Type'}
          <svg
            className={`w-5 h-5 ml-2 transition-transform duration-300 ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Menu.Button>
      </div>
      <Menu.Items className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
        {['Service', 'Combo', 'Product'].map((type) => (
          <Menu.Item key={type}>
            {({ active }) => (
              <button
                onClick={() => handleItemChange(index, 'type', type)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                }`}
              >
                {type}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </>
  )}
</Menu>

            {/* Item Dropdown */}
            <Combobox
  as="div"
  className="relative "
  value={item.item}
  onChange={(value) => handleItemChange(index, 'item', value)}
>
  {({ open }) => (
    <>
      <div className="relative w-50">
        <Combobox.Input
          className="p-2 border rounded-md w-full"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or Select Item"
          displayValue={(selected) => (selected ? selected.name : '')}
        />
        <svg
          className={`absolute right-3 top-3 w-5 h-5 text-gray-500 transition-transform duration-300 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <Combobox.Options className="absolute mt-1 max-h-60 w-40 overflow-auto bg-white border rounded-md shadow-lg z-10">
        {displayedOptions.length > 0 ? (
          displayedOptions.map((opt) => (
            <Combobox.Option
              key={opt.id}
              value={opt}
              className={({ active }) =>
                `cursor-pointer select-none px-4 py-2 ${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                }`
              }
            >
              {opt.name}
            </Combobox.Option>
          ))
        ) : (
          <div className="cursor-default select-none px-4 py-2 text-gray-500">
            No results found
          </div>
        )}
      </Combobox.Options>
    </>
  )}
</Combobox>


            {/* Quantity */}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              className="w-20 p-2 border rounded-md"
            />

            {/* Price */}
            <input
              type="number"
              value={item.price}
              readOnly
              className="w-24 p-2 border rounded-md bg-gray-100"
            />

            {/* Total */}
            <input
              type="number"
              value={item.total}
              readOnly
              className="w-24 p-2 border rounded-md bg-gray-100"
            />

            {/* Remove Item */}
            <button type="button" onClick={() => removeItem(index)} className="text-red-600">
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Item
        </button>
      </div>

      {/* Coupon Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Coupon</label>
        <Combobox value={selectedCoupon} onChange={setSelectedCoupon}>
      {({ open }) => (
        <div className="relative">
          {/* Input Field with Dropdown Icon */}
          <div className="relative">
            <Combobox.Input
              className="w-full p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search or Select Coupon"
              displayValue={(coupon) => coupon || ''}
            />
            <svg
              className={`absolute right-3 top-3 w-5 h-5 text-gray-500 transition-transform duration-300 ${
                open ? 'rotate-180' : 'rotate-0'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown Options */}
          <Combobox.Options
            className="absolute mt-1 max-h-60 w-full bg-white border rounded-md shadow-lg z-10 overflow-auto"
          >
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <Combobox.Option
                  key={coupon}
                  value={coupon}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {coupon}
                </Combobox.Option>
              ))
            ) : (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">
                No results found
              </div>
            )}
          </Combobox.Options>
        </div>
      )}
    </Combobox>

      </div>

      {/* Grand Total */}
      <div className="text-lg font-bold">Grand Total: ₹{calculateGrandTotal()}</div>

      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-md">
        Submit Bill
      </button>
    </form>
  )
}

export default CreateBill
