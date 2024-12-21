import React, { useEffect, useState } from 'react'
import CreateUser from './CreateUser'
import EditUser from './EditUser'
import useAuth from '../../services/useAuth'
import useCustomer from '../../services/useCustomer'

const Customer = () => {
  const [VendorDetails, setVendorDetails] = useState([])
  const { getUsers } = useAuth()
  const {getSalonCustomer} = useCustomer();
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [vendorToEdit, setVendorToEdit] = useState(null)

  const fetchUser = async () => {
    const data = await getSalonCustomer();
    console.log("Customer data",data)
    setVendorDetails([])
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleEditVendor = (vendor) => {
    setVendorToEdit(vendor)
    setEdit(true)
  }

  const handleEdit = (id) => {
    // Logic for editing vendor details
    console.log(`Edit vendor with id: ${id}`)
  }

  const handleDelete = (id) => {
    // Logic for deleting vendor details
    console.log(`Delete vendor with id: ${id}`)
    setVendorDetails(VendorDetails.filter((vendor) => vendor.id !== id))
  }

  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold text-subheading">Customer</h2>
            <h2 className="text-3xl font-bold">Customers</h2>
          </div>
          <button
            onClick={() => setCreate(true)}
            className="m-3 mr-10 bg-accent px-5 py-2 rounded-xl text-black font-bold bg-yellow-500 hover:bg-yellow-500 transition-colors"
          >
            Add a new Customer
          </button>
        </div>

        <div className="relative rounded-2xl overflow-x-auto mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold">Customer Details</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {VendorDetails?.map((item) => (
                <tr key={item.id} className="bg-white text-large">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-normal max-w-xs break-words">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => handleEditVendor(item)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {create && <CreateUser fetchUser={fetchUser} setCreate={setCreate} create={create} />}
      {edit && (
        <EditUser
          setEdit={setEdit}
          edit={edit}
          vendorToEdit={vendorToEdit}
          setVendorDetails={setVendorDetails}
          fetchUser={fetchUser}
        />
      )}
    </div>
  )
}

export default Customer
