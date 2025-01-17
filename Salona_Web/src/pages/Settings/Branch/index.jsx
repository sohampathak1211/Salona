import React, { Fragment, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../index.css'
import BranchCard from './BranchCard'
import { Dialog, Transition } from '@headlessui/react'
import { AiFillShop } from 'react-icons/ai'
import useBranch from '../../../services/useBranch'
import { useDispatch, useSelector } from 'react-redux'
import {
  branchAddBranch,
  branchFailed,
  branchRequest,
  branchSuccess
} from '../../../slices/branchSlice'

const Branch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { createBranch, getSalonBranches } = useBranch()
  const branchData = useSelector((state) => state.branch)
  const dispatch = useDispatch()

  const addBranch = (branch) => {
    dispatch(branchAddBranch(branch))
  }

  const getBranches = async () => {
    dispatch(branchRequest())
    const data = await getSalonBranches({}, {})
    if (data.error) {
      dispatch(branchFailed(data.error))
      toast.info("You don't have branches. Open the settings page and add a branch to continue")
      return
    }
    dispatch(branchSuccess(data))
  }

  useEffect(() => {
    getBranches()
  }, [])

  const [newBranch, setNewBranch] = useState({
    address: '',
    phone: '',
    description: ''
  })

  const handleAddBranch = async () => {
    if (!newBranch.address || !newBranch.phone || !newBranch.description) {
      toast.error('All fields are required!')
      return
    }
    try {
      const data = await createBranch(newBranch, {})
      addBranch(data)
      setIsModalOpen(false)
      toast.success('Branch added successfully!')
      setNewBranch({
        address: '',
        phone: '',
        description: ''
      })
    } catch (e) {
      console.log('Error createing the branch', e)
    }
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-600">Branch Dashboard</h1>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Branch
        </button>
      </div>
      {branchData.result.length === 0 ? (
        <div className="text-center text-gray-500">
          <h2>Currently, you don't have any branches registered under your salon.</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {branchData.result.length > 0 &&
            branchData.result.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
              />
            ))}
        </div>
      )}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-xl pb-2 font-semibold leading-6 text-gray-900"
                  >
                    <AiFillShop size={25} color="gray" className="mr-2" />
                    New Branch
                  </Dialog.Title>
                  <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="text"
                          value={newBranch.phone}
                          onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Branch Address
                        </label>
                        <textarea
                          value={newBranch.address}
                          onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm h-24 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          value={newBranch.description}
                          onChange={(e) =>
                            setNewBranch({ ...newBranch, description: e.target.value })
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm h-24 resize-none"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddBranch}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Branch
