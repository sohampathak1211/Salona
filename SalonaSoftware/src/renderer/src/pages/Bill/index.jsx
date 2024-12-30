import React, { useEffect, useState, useRef } from 'react'
import ViewBill from './ViewBill'
import CreateBill from './CreateBill'
import { useNavigate } from 'react-router-dom'
import useBill from '../../services/useBill'
import FlatList from 'flatlist-react'

const Bill = () => {
  const { getBill } = useBill() // Custom hook to fetch bill data
  const [billDetails, setBillDetails] = useState([]) // Store bill details
  const [company, setCompany] = useState(null) // Company info (if required)
  const [view, setView] = useState(false) // Toggle for detailed view
  const [viewBill, setBill] = useState(null) // Selected bill details
  const navigate = useNavigate() // For routing
  const [page, setPage] = useState(1)
  const sentinelRef = useRef(null) // Ref for the "Load More" sentinel
  const [isLoading, setIsLoading] = useState(false) // To prevent multiple triggers

  // Fetch bill data
  const getProducts = async () => {
    const billData = await getBill({ page: page })
    console.log('Bill Data', billData)
    setBillDetails((prev) => [...prev, ...billData]) // Append new data to existing list
    setIsLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [page])

  // Handle viewing a specific bill
  const handleBillView = (item) => {
    setBill(item)
  }

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true)
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1.0 }
    )

    const currentSentinel = sentinelRef.current
    if (currentSentinel) {
      observer.observe(currentSentinel)
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
      }
    }
  }, [isLoading])

  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold text-subheading">
              Billing {view ? '   >    Create Bill' : ''}
            </h2>
            <h2 className="text-3xl font-bold">Billing Section</h2>
          </div>
          <button
            onClick={() => navigate('/auth/createBill')}
            className="m-3 mr-10 bg-yellow-400 px-5 py-2 rounded-xl text-black font-bold hover:bg-yellow-500 transition-colors duration-300"
          >
            Add a Bill
          </button>
        </div>

        {/* Table Section */}
        <div className={`relative rounded-2xl overflow-x-auto mt-5 ${view ? 'hidden' : 'block'}`}>
          <h2 className="w-full bg-white p-5 text-xl font-bold">Bill Details</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Branch Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Final Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {billDetails.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleBillView(item)}
                  className="bg-white hover:bg-slate-50 text-large cursor-pointer"
                >
                  <th scope="row" className="pl-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.branch.address}
                  </th>
                  <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{item?.customer?.name}</td>
                  <td className="px-6 py-4">{item?.customer?.phone}</td>
                  <td className="px-6 py-4">₹{item.final_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Sentinel for IntersectionObserver */}
          <div ref={sentinelRef} className="h-10 bg-transparent"></div>
        </div>

        {/* Add Create Bill Component */}
        <CreateBill view={view} />
      </div>

      {/* Add View Bill Component */}
      {viewBill && <ViewBill company={company} view={viewBill} setView={setBill} />}
    </div>
  )
}

export default Bill
