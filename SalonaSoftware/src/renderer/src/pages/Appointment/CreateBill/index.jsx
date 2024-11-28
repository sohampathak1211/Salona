import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CreateBill = ({ view }) => {
  const [vendorId, setVendorId] = useState('')
  const [vehicleId, setVehicleId] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [items, setItems] = useState([
    { name: '', hsn_sac: '', quantity: 1, unit: 1, price_per_unit: 0, cgst: 0, sgst: 0, total: 0 }
  ])

  // Handles adding a new item
  const addItem = () => {
    setItems([
      ...items,
      { name: '', hsn_sac: '', quantity: 1, unit: 1, price_per_unit: 0, cgst: 0, sgst: 0, total: 0 }
    ])
  }

  // Handles removing an item by index
  const removeItem = (index) => {
    if (items.length === 1) {
      toast.error('At least one item is required in the bill.')
      return
    }
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  // Handles changes in item fields and calculates CGST, SGST, and total price
  const handleItemChange = (index, e) => {
    const { name, value } = e.target
    const updatedItems = [...items]
    updatedItems[index][name] = value

    // Calculate total price, CGST, SGST, and total taxable amount
    const pricePerUnit = updatedItems[index].price_per_unit
    const quantity = updatedItems[index].quantity
    const unit = updatedItems[index].unit

    if (pricePerUnit && quantity && unit) {
      const total = pricePerUnit * quantity * unit
      updatedItems[index].cgst = (total * 0.09).toFixed(2)
      updatedItems[index].sgst = (total * 0.09).toFixed(2)
      updatedItems[index].total = total.toFixed(2)
    }

    setItems(updatedItems)
  }

  // Calculate combined total of all items
  const calculateGrandTotal = () => {
    return items.reduce((acc, item) => acc + parseFloat(item.total || 0), 0).toFixed(2)
  }

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const billData = {
      ven_id: vendorId,
      veh_id: vehicleId,
      from_add: fromAddress,
      to_add: toAddress,
      items: items
    }
    console.log('Bill Data:', JSON.stringify(billData, null, 2))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 bg-white rounded-xl mt-5 p-5 mb-40 ${view ? 'block' : 'hidden'}`}
    >
      {/* Vendor Dropdown */}
      <div>
        <label className="block text-sm font-medium">Vendor</label>
        <select
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          required
        >
          <option value="" disabled>
            Select Vendor
          </option>
          <option value="1">Hello Travels</option>
        </select>
      </div>

      {/* Vehicle Dropdown */}
      <div>
        <label className="block text-sm font-medium">Vehicle</label>
        <select
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          required
        >
          <option value="" disabled>
            Select Vehicle
          </option>
          <option value="7">MH 20 HG 4563</option>
        </select>
      </div>

      {/* From Address */}
      <div>
        <label className="block text-sm font-medium">From Address</label>
        <input
          type="text"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          placeholder="Enter From Address"
          required
        />
      </div>

      {/* To Address */}
      <div>
        <label className="block text-sm font-medium">To Address</label>
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          placeholder="Enter To Address"
          required
        />
      </div>

      {/* Items Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Items</h2>

        {/* Top strip */}
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md text-sm font-medium mb-4">
          <div className="w-1/4">Item Name</div>
          <div className="w-1/6">HSN/SAC</div>
          <div className="w-1/6">Qty</div>
          <div className="w-1/6">Unit</div>
          <div className="w-1/6">Price/Unit</div>
          <div className="w-1/6">CGST</div>
          <div className="w-1/6">SGST</div>
          <div className="w-1/12">Total</div>
          <div className="w-1/12"></div>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, e)}
              className="w-1/4 p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="hsn_sac"
              placeholder="HSN/SAC"
              value={item.hsn_sac}
              onChange={(e) => handleItemChange(index, e)}
              className="w-1/6 p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="w-1/6 p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="unit"
              value={item.unit}
              onChange={(e) => handleItemChange(index, e)}
              className="w-1/6 p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="price_per_unit"
              placeholder="Price/Unit"
              value={item.price_per_unit}
              onChange={(e) => handleItemChange(index, e)}
              className="w-1/6 p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="cgst"
              placeholder="CGST"
              value={item.cgst}
              readOnly
              className="w-1/6 p-2 border rounded-md bg-gray-100"
            />
            <input
              type="number"
              name="sgst"
              placeholder="SGST"
              value={item.sgst}
              readOnly
              className="w-1/6 p-2 border rounded-md bg-gray-100"
            />
            <input
              type="number"
              name="total"
              placeholder="Total"
              value={item.total}
              readOnly
              className="w-1/6 p-2 border rounded-md bg-gray-100"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="red"
              className="size-8"
              onClick={() => removeItem(index)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="mt-4 flex items-center px-4 font-semibold py-2 bg-blue-500 text-white rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-5 mr-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Item
        </button>
      </div>

      {/* Total Amount */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Total Amount: {calculateGrandTotal()}</h3>
      </div>

      <button type="submit" className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-md">
        Submit Bill
      </button>
    </form>
  )
}

export default CreateBill
