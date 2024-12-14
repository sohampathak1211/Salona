import React, { useEffect, useState, Fragment } from 'react'
import CreateService from './CreateService'
import Modal from 'react-modal'
import EditService from './EditService'
import useService from '../../services/useService'
import useBranch from '../../services/useBranch'
import { Dialog, Transition } from '@headlessui/react'
import { AiFillShop } from 'react-icons/ai'

const Services = () => {
  const [VendorDetails, setVendorDetails] = useState([])
  const { getBranchServices } = useService()
  const { getSalonBranches } = useBranch()

  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [vendorToEdit, setVendorToEdit] = useState(null)
  const [branch, setBranch] = useState([])

  const fetchVendor = async () => {
    const data = await getBranchServices({}, { branch_id: 2 })
    console.log('Data For services', data)
    setVendorDetails(() => data)
  }

  const fetchBranches = async () => {
    const data = await getSalonBranches({}, { salon_id: 1 })
    console.log('Salon Data', data)
  }

  useEffect(() => {
    fetchBranches()
    fetchVendor()
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
            <h2
              className="text-sm font-bold text-subheading"
              onClick={() =>
                window.electron.ipcRenderer
                  .invoke('createServices', { key: 'data', value: {} })
                  .then((d) => console.log('Success'))
                  .catch((e) => console.log(e))
              }
            >
              Services
            </h2>
            <h2 className="text-3xl font-bold">Services</h2>
          </div>
          <button
            onClick={() => setCreate(true)}
            className="m-3 mr-10 bg-accent px-5 py-2 rounded-xl text-black font-bold bg-yellow-500 hover:bg-yellow-500  transition-colors"
          >
            Add a new Services
          </button>
        </div>

        <div className="relative rounded-2xl overflow-x-auto mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold">Services Details</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Service Name
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
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {VendorDetails.length > 0 &&
                VendorDetails.map((item) => (
                  <tr key={item.service_id} className="bg-white text-large">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
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
                      {item.duration}
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
      <Transition appear show={create} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setCreate(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-xl pb-2 font-semibold leading-6 text-gray-900"
                  >
                    <AiFillShop size={25} color="gray" className="mr-2" />
                    New Service
                  </Dialog.Title>
                  <CreateService fetchVendor={fetchVendor} setCreate={setCreate} create={create} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {edit && (
        <EditService
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

export default Services
