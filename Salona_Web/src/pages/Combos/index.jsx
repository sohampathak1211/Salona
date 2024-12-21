import React, { useEffect, useState } from 'react'
import CreateVendor from './CreateVendor'
import Modal from 'react-modal'
import EditVendor from './EditVendor'

const Combos = () => {
  const [VendorDetails, setVendorDetails] = useState([])

  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [vendorToEdit, setVendorToEdit] = useState(null)

  const fetchVendor = () => {
    // window.electron.ipcRenderer
    // .invoke('getVendors')
    // .then((data) => setVendorDetails(data))
    // .catch((e) => console.log(e))
  }

  useEffect(() => {
    fetchVendor();
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
            <h2 className="text-sm font-bold text-subheading">Combos</h2>
            <h2 className="text-3xl font-bold">Combos</h2>
          </div>
          <button
            onClick={() => setCreate(true)}
            className="m-3 mr-10 bg-accent px-5 py-2 rounded-xl text-black font-bold bg-yellow-500 hover:bg-yellow-500  transition-colors"
          >
            Add a new Combo
          </button>
        </div>

        <div className="relative rounded-2xl overflow-x-auto mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold">Combo Details</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                Combo Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Services
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {VendorDetails.map((item) => (
                <tr key={item.service_id} className="bg-white text-large">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-normal max-w-xs break-words">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.services}
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
      {create && <CreateVendor fetchVendor={fetchVendor} setCreate={setCreate} create={create} />}
      {edit && (
        <EditVendor
          setEdit={setEdit}
          edit={edit}
          vendorToEdit={vendorToEdit}
          setVendorDetails={setVendorDetails}
          fetchVendor={fetchVendor}
        />
      )}
    </div>
  )
}

export default Combos
