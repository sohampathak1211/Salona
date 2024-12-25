import React, { useEffect, useState, Fragment } from 'react'
import CreateCombo from './CreateCombo'
import EditCombo from './EditCombo'
import useService from '../../services/useService'
import useBranch from '../../services/useBranch'
import { Dialog, Transition } from '@headlessui/react'
import { AiFillShop } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { branchFailed, branchRequest, branchSuccess, selectBranch } from '../../slices/branchSlice'
import {
  selectService,
  serviceEdit,
  serviceRequest,
  serviceSuccess
} from '../../slices/serviceSlice'
import useCombo from '../../services/useCombo'
import { comboRequest, comboSuccess, selectCombo } from '../../slices/comboSlice'
import { toast } from 'react-toastify'
import useAssets from '../../components/categories'

const Combos = () => {
  const dispatch = useDispatch()
  const { getSalonBranches } = useBranch()
  const { getSalonServices } = useService()
  const { getSalonCombos } = useCombo()
  const services = useSelector(selectService)
  const branches = useSelector(selectBranch)
  const combos = useSelector(selectCombo)
  const temp = useSelector((state) => state.branch)
  const { isAdmin } = useAssets()
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [vendorToEdit, setVendorToEdit] = useState(null)

  const getBranches = async () => {
    dispatch(branchRequest())
    const data = await getSalonBranches({}, {})
    if (data.error) {
      dispatch(branchFailed(data.error))
      toast.info("You don't have branches. Open the settings page and add a branch to continue")
      return
    }
    dispatch(branchSuccess(data))
    // }
  }

  const getServices = async () => {
    dispatch(serviceRequest())
    const serv = await getSalonServices()
    dispatch(serviceSuccess(serv))
  }

  const getCombos = async () => {
    dispatch(comboRequest())
    const comb = await getSalonCombos()
    dispatch(comboSuccess(comb))
  }

  useEffect(() => {
    if (services.length <= 0) {
      getServices()
    }
    if (branches.length <= 0) {
      getBranches()
    }
    if (combos.length <= 0) {
      getCombos()
    }
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
  }

  const handleServiceOpen = () => {
    if (branches.length <= 0) {
      toast.info("You don't have branches. Open the settings page and add a branch to continue")
      return
    } else {
      setCreate(true)
    }
  }

  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div className="">
            <h2 className="text-sm font-bold text-subheading">Combos</h2>
            <h2 className="text-3xl font-bold">Combos</h2>
          </div>
          {isAdmin ? <button
            onClick={handleServiceOpen}
            className="m-3 mr-10 px-5 py-2 rounded-xl text-black font-bold bg-yellow-500 hover:bg-yellow-500  transition-colors"
          >
            Add a new Combos
          </button> : <Fragment></Fragment>}
        </div>

        <div className="relative rounded-2xl overflow-x-auto md:overflow-x-hidden mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold">Combos Details</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr className="">
                <th scope="col" className="px-2 py-3">
                  Branch Name
                </th>
                <th scope="col" className="px-2 py-3">
                  Combo Name
                </th>
                {/* <th scope="col" className="px-2 py-3">
                  Category
                </th> */}
                <th scope="col" className="px-2 py-3">
                  Description
                </th>
                <th scope="col" className="px-2 py-3">
                  Price
                </th>
                <th scope="col" className="px-2 py-3 max-w-[500px] text-center">
                  Services
                </th>
                <th scope="col" className="px-2 w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {combos.length > 0 &&
                combos.map((item) => (
                  <tr key={item.id} className="bg-white border-b-[1px] border-gray-100 text-large">
                    <td
                      scope="row"
                      className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-wrap"
                    >
                      {item.branch?.address}
                    </td>
                    <td
                      scope="row"
                      className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-wrap"
                    >
                      {item.name}
                    </td>
                    {/* <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.category}
                    </td> */}
                    <td className="px-2 py-4 max-w-60 font-medium text-gray-900 whitespace-nowrap text-wrap break-words hyphens-auto">
                      {item.description}
                    </td>
                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-normal max-w-xs break-words">
                      {item.price}
                    </td>
                    <td className="w-full flex flex-wrap justify-center font-medium text-gray-900 whitespace-nowrap">
                      {item?.services.map((temp) => (
                        <h2 className="bg-gray-200 text-xs m-1 p-1 rounded-md">{temp.name}</h2>
                      ))}
                    </td>
                    <td className="py-4 w-20 font-medium text-gray-900 whitespace-nowrap">
                      <button
                        onClick={() => handleEditVendor(item)}
                        className="text-blue-500 hover:text-blue-700 mr-4 w-full "
                      >
                        Edit
                      </button>
                      {/* <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button> */}
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-xl pb-2 font-semibold leading-6 text-gray-900"
                  >
                    <AiFillShop size={25} color="gray" className="mr-2" />
                    New Combo
                  </Dialog.Title>
                  <CreateCombo setCreate={setCreate} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={edit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setEdit(false)}>
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
                    Edit Combo
                  </Dialog.Title>
                  <EditCombo setEdit={setEdit} edit={edit} vendorToEdit={vendorToEdit} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Combos
