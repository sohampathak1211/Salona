import React, { useEffect, useState } from 'react'
// import CreateBill from './CreateBill';  // Modal component for creating a new bill
// import EditBill from './EditBill';      // Modal component for editing an existing bill
import ViewBill from './ViewBill'
import CreateBill from './CreateBill'
import { useNavigate } from 'react-router-dom'

const Bill = () => {
  const [billDetails, setBillDetails] = useState([])
  const [company, setCompany] = useState(null)
  const [view, setView] = useState(false)
  const [viewBill, setBill] = useState(null)
  const navigate = useNavigate()

  
  useEffect(() => {
  
  }, [])

  const handleBillView = (item) => {
    setBill(item)
  }

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
                {/* Added Vehicle Number */}
                <th scope="col" className="px-6 py-3">
                  Final Amount
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {billDetails.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleBillView(item)}
                  className="bg-white hover:bg-slate-50 text-large"
                >
                  <th
                    scope="row"
                    className={`pl-6 py-4 font-medium text-gray-900 whitespace-nowrap`}
                  >
                    {item.branch.address}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.created_at.split('-').reverse().join('-')}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item?.customer?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item?.customer?.phone}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    ₹{item.final_amount}
                  </td>
                  {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => handleEditBill(item)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBill(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CreateBill view={view} />
      </div>
      {viewBill && <ViewBill company={company} view={viewBill} setView={setBill} />}
      {/* {create && <CreateBill fetchBills={fetchBills} setCreate={setCreate} />}
      {edit && (
        <EditBill
          setEdit={setEdit}
          edit={edit}
          billToEdit={billToEdit}
          setBillDetails={setBillDetails}
          fetchBills={fetchBills}
        />
      )} */}
    </div>
  )
}

export default Bill
