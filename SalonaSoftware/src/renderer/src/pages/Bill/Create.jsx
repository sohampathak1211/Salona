import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { selectService } from '../../slices/serviceSlice'
import { selectCombo } from '../../slices/comboSlice'
import { selectBranch } from '../../slices/branchSlice'

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
            <Listbox value={item.type} onChange={(value) => handleItemChange(index, 'type', value)}>
              <Listbox.Button className="p-2 border rounded-md">
                {item.type || 'Select Type'}
              </Listbox.Button>
              <Listbox.Options className="border rounded-md mt-1 bg-white">
                {['Service', 'Combo', 'Product'].map((type) => (
                  <Listbox.Option key={type} value={type}>
                    {type}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>

            {/* Item Dropdown */}
            <Listbox value={item.item} onChange={(value) => handleItemChange(index, 'item', value)}>
              <Listbox.Button className="p-2 border rounded-md w-40">
                {item.item ? item.item.name : 'Select Item'}
              </Listbox.Button>
              <Listbox.Options className="border rounded-md mt-1 bg-white">
                {(item.type === 'Service'
                  ? services
                  : item.type === 'Combo'
                    ? combos
                    : products
                ).map((opt) => (
                  <Listbox.Option key={opt.id} value={opt}>
                    {opt.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>

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
        <Listbox value={coupon} onChange={setCoupon}>
          <Listbox.Button className="w-full p-2 border rounded-md">
            {coupon || 'Select Coupon'}
          </Listbox.Button>
          <Listbox.Options className="border rounded-md mt-1 bg-white">
            {['DISCOUNT10', 'SALE20', 'WELCOME5'].map((c) => (
              <Listbox.Option key={c} value={c}>
                {c}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
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
