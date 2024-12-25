import React, { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { selectService } from '../../slices/serviceSlice'
import { selectCombo } from '../../slices/comboSlice'
import { selectBranch } from '../../slices/branchSlice'
import { Menu } from '@headlessui/react'
import { Combobox } from '@headlessui/react'
import { selectCoupon } from '../../slices/couponSlice'
import useProduct from '../../services/useProduct'

const CreateBill = () => {
  const { getSalonProducts } = useProduct()
  const branches = useSelector(selectBranch)
  const services = useSelector(selectService)
  const combos = useSelector(selectCombo)
  const coupons = useSelector(selectCoupon)

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const proData = await getSalonProducts()
    setProducts(proData)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const [selectedBranch, setSelectedBranch] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [selectedCoupon, setSelectedCoupon] = useState(null)
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
      updatedItems[index].price = parseFloat(value.price) || 0
    }

    updatedItems[index].total = updatedItems[index].price * updatedItems[index].quantity || 0

    setItems(updatedItems)
  }

  const calculateGrandTotal = () => {
    const totalBeforeCoupon = items.reduce((sum, item) => sum + item.total, 0)

    let discount = 0
    if (selectedCoupon) {
      const { by_percent, discount_amount, discount_percentage, minimum_amount, is_minimum_purchase } = selectedCoupon

      if (!is_minimum_purchase || totalBeforeCoupon >= parseFloat(minimum_amount)) {
        if (by_percent) {
          discount = (totalBeforeCoupon * parseFloat(discount_percentage)) / 100
        } else {
          discount = parseFloat(discount_amount)
        }
      }
    }

    return {
      beforeCoupon: totalBeforeCoupon.toFixed(2),
      afterCoupon: Math.max(totalBeforeCoupon - discount, 0).toFixed(2)
    }
  }

  const [query, setQuery] = useState('')

  const filteredOptions = (index) => {
    if (items[index].type === 'Service') return services
    if (items[index].type === 'Combo') return combos
    if (items[index].type === 'Product') return products
    return []
  }

  const displayedOptions = (index) => {
    const options = filteredOptions(index)
    return query === ''
      ? options
      : options.filter((opt) => opt.name.toLowerCase().includes(query.toLowerCase()))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { beforeCoupon, afterCoupon } = calculateGrandTotal()

    const billData = {
      branch: selectedBranch,
      customerName,
      contactNumber,
      coupon: selectedCoupon,
      items,
      totalBeforeCoupon: beforeCoupon,
      totalAfterCoupon: afterCoupon
    }
    console.log('Bill Data:', billData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded-lg shadow-md space-y-6">
      {/* Branch Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Branch</label>
        <Listbox value={selectedBranch} onChange={setSelectedBranch}>
          <Listbox.Button className="w-full p-2 border rounded-md">
            {selectedBranch ? selectedBranch.address : 'Select Branch'}
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
              className="relative"
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
                    {displayedOptions(index).length > 0 ? (
                      displayedOptions(index).map((opt) => (
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
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {/* Coupon Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Coupon</label>
        <Listbox value={selectedCoupon} onChange={setSelectedCoupon}>
          <Listbox.Button className="w-full p-2 border rounded-md">
            {selectedCoupon ? selectedCoupon.code : 'Select Coupon'}
          </Listbox.Button>
          <Listbox.Options className="border rounded-md mt-1 bg-white">
            {coupons.map((coupon) => (
              <Listbox.Option key={coupon.id} value={coupon}>
                {coupon.code}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      {/* Total Summary */}
      <div className="p-4 bg-gray-100 rounded-md">
        <p className="text-sm font-medium">Total Before Coupon: ${calculateGrandTotal().beforeCoupon}</p>
        <p className="text-sm font-medium">Total After Coupon: ${calculateGrandTotal().afterCoupon}</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Submit Bill
      </button>
    </form>
  )
}

export default CreateBill
