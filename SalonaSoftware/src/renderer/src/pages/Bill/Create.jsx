import React, { useEffect, useState, Fragment } from 'react'
import { Listbox, Combobox, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { selectService } from '../../slices/serviceSlice'
import { selectCombo } from '../../slices/comboSlice'
import { selectBranch } from '../../slices/branchSlice'
import { selectCoupon } from '../../slices/couponSlice'
import useProduct from '../../services/useProduct'
import { FaChevronDown } from 'react-icons/fa'
import useAssets from '../../components/categories'
import { toast } from 'react-toastify'
import useBill from '../../services/useBill'

const CreateBill = () => {
  const { getSalonProducts } = useProduct()
  const { createBill } = useBill()
  const { isAdmin } = useAssets()
  const branches = useSelector(selectBranch)
  const services = useSelector(selectService)
  const combos = useSelector(selectCombo)
  const coupons = useSelector(selectCoupon)

  const [products, setProducts] = useState([])
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [items, setItems] = useState([{ type: '', item: null, quantity: 1, price: 0, total: 0 }])
  const [query, setQuery] = useState('')
console.log(selectedCoupon,"selecsf")
  useEffect(() => {
    const getProducts = async () => {
      const proData = await getSalonProducts()
      setProducts(proData)
    }
    getProducts()
  }, [])

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
      const {
        by_percent,
        discount_amount,
        discount_percentage,
        minimum_amount,
        is_minimum_purchase
      } = selectedCoupon

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

  const validateBill = () => {
    if (!customerName.trim()) {
      toast.info('Customer name is required.')
      return false
    }
    if (!contactNumber.trim()) {
      toast.info('Contact number is required.')
      return false
    }
    if (isAdmin && !selectedBranch) {
      toast.info('Branch is required for admin users.')
      return false
    }
    if (items.length === 0) {
      toast.info('At least one item must be added to the bill.')
      return false
    }
    for (let item of items) {
      if (!item.type) {
        toast.info('Each item must have a type selected.')
        return false
      }
      if (!item.item) {
        toast.info('Each item must have an item selected.')
        return false
      }
      if (!item.quantity || item.quantity <= 0) {
        toast.info('Each item must have a valid quantity.')
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateBill()) return

    const services_data = items
      .filter((item) => item.type === 'Service')
      .map((service) => ({
        id: service.item.id,
        quantity: service.quantity
      }))

    const combos_data = items
      .filter((item) => item.type === 'Combo')
      .map((combo) => ({
        id: combo.item.id,
        quantity: combo.quantity
      }))

    const products_data = items
      .filter((item) => item.type === 'Product')
      .map((product) => ({
        id: product.item.id,
        quantity: product.quantity
      }))

    const billData = {
      c_name: customerName,
      c_phone: contactNumber,
      branch_id: isAdmin && selectedBranch ? selectedBranch.id : null,
      services: services_data,
      combos: combos_data,
      products: products_data,
      coupon: selectedCoupon.id
    }
    console.log(billData)

    try {
      const response = await createBill(billData)
      toast.success('Bill created successfully!')
      console.log('Payload Data:', response)
    } catch (error) {
      toast.error('Failed to create bill. Please try again.')
      console.error('Error creating bill:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded-lg shadow-md space-y-6">
      {/* Branch Dropdown */}
      <div className="h-full">
        <label className="block text-sm font-medium text-gray-900">Branch</label>
        <Listbox value={selectedBranch} onChange={setSelectedBranch}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left  border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selectedBranch ? selectedBranch.address : 'Select Branch'}
              </span>
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
                {branches.map((branch) => (
                  <Listbox.Option
                    key={branch.id}
                    className={({ active }) =>
                      `relative cursor-default select-none p-2 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={branch}
                  >
                    <span className={`block text-sm truncate font-normal`}>{branch.address}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
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
        <div className="grid grid-cols-5 gap-2 font-medium text-gray-700">
          <div>Type</div>
          <div>Item</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Total</div>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-3">
            {/* Type Dropdown */}
            <Listbox value={item.type} onChange={(value) => handleItemChange(index, 'type', value)}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left  border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{item.type || 'Select Type'}</span>
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
                    {['Service', 'Combo', 'Product'].map((type) => (
                      <Listbox.Option
                        key={type}
                        className={({ active }) =>
                          `relative cursor-default select-none p-2 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={type}
                      >
                        <span className="block text-sm truncate font-normal">{type}</span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            {/* Item Dropdown */}
            <Combobox
              value={item.item}
              onChange={(value) => handleItemChange(index, 'item', value)}
              as="div"
              className="relative w-full"
            >
              <div>
                <Combobox.Input
                  className="p-2 border rounded-md w-full"
                  placeholder="Search or Select Item"
                  onChange={(e) => setQuery(e.target.value)}
                  displayValue={(selected) => (selected ? selected.name : '')}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>
              </div>
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white border rounded-md shadow-lg z-10">
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
        <div className="flex mt-2 justify-between">
          <button
            type="button"
            onClick={addItem}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Item
          </button>
          <div className="h-full flex items-center">
            <label className="block text-md font-medium mr-4 text-gray-900">Coupon</label>
            <Listbox value={selectedCoupon} onChange={setSelectedCoupon}>
              <div className="relative mt-1 w-[400px]">
                <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left  border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {selectedCoupon ? selectedCoupon.code : 'Select Coupon'}
                  </span>
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
                    {coupons.map((coupon) => (
                      <Listbox.Option
                        key={coupon.id}
                        className={({ active }) =>
                          `relative cursor-default select-none p-2 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={coupon}
                      >
                        <span className={`block text-sm truncate font-normal`}>
                          {coupon.code}{' '}
                          <span className="text-gray-400">
                            {coupon.is_minimum_purchase
                              ? `Min Purchase of ${coupon.minimum_amount}`
                              : `${coupon.by_percent ? coupon.discount_percentage : coupon.discount_amount} ${coupon.by_percent ? '%' : 'Rs.'} off on ${coupon.valid_services.map((service) => service.name).join(',')} & ${coupon.valid_combos.map((combo) => combo.name).join(',')}`}
                          </span>
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>

      {/* Total Section */}
      <div className="mt-4 w-[300px]">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Total Before Coupon:</span>
          <span>{calculateGrandTotal().beforeCoupon}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Total After Coupon:</span>
          <span>{calculateGrandTotal().afterCoupon}</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit Bill
        </button>
      </div>
    </form>
  )
}

export default CreateBill
