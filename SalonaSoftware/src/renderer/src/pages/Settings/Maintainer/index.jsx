import React, { Fragment, useEffect, useState } from 'react'
import MaintainerCard from './MaintainerCard'
import { GoEye } from 'react-icons/go'
import { GoEyeClosed } from 'react-icons/go'
import { FaChevronUp } from 'react-icons/fa6'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import useMaintainer from '../../../services/useMaintainer'
import { useSelector } from 'react-redux'
import AddMaintainer from './AddMaintainer'
import { AiFillShop } from 'react-icons/ai'
import { GrUserWorker } from 'react-icons/gr'
import { toast } from 'react-toastify'
import { selectBranch } from '../../../slices/branchSlice'
const Maintainer = () => {
  const [maintainers, setMaintainers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      branch: { address: 'ABC@123' }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
      branch: { address: 'ABC@123' }
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alicej@example.com',
      phone: '456-789-0123',
      branch: { address: 'ABC@123' }
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bobbrown@example.com',
      phone: '321-654-9870',
      branch: { address: 'ABC@123' }
    }
  ])
  const branches = useSelector(selectBranch)
  const { getSalonMaintainers } = useMaintainer()

  const [currentMaintainer, setCurrentMaintainer] = useState({
    id: null,
    name: '',
    email: '',
    phone: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchMaintainers = async () => {
    const data = await getSalonMaintainers()
    console.log('Data for the maintainers', data)
    setMaintainers(data)
  }

  useEffect(() => {
    fetchMaintainers()
  }, [])

  const handleDelete = (id) => {
    setMaintainers((prev) => prev.filter((maintainer) => maintainer.id !== id))
  }

  const resetModal = () => {
    setCurrentMaintainer({ id: null, name: '', email: '', phone: '' })
    setIsModalOpen(false)
  }

  const handleServiceOpen = () => {
    if (branches.length <= 0) {
      toast.info('Maintainer cannot be created without a branch. Please add a branch first.')
      return
    } else {
      setCurrentMaintainer({ id: null, name: '', email: '', phone: '' })
      setIsModalOpen(true)
    }
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="w-full flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Salon Maintainers</h2>
        <button
          onClick={handleServiceOpen}
          className="w-40 text-center py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded"
        >
          Add Maintainer
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {maintainers.map((maintainer) => (
          <MaintainerCard
            key={maintainer.id}
            maintainer={maintainer}
            onEdit={() => {
              setCurrentMaintainer(maintainer)
              setIsModalOpen(true)
            }}
            onDelete={() => handleDelete(maintainer.id)}
          />
        ))}
      </div>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-xl pb-4 font-semibold leading-6 text-gray-900"
                  >
                    <GrUserWorker size={25} color="gray" className="mr-2" />
                    Add Maintainer
                  </Dialog.Title>
                  <AddMaintainer
                    currentMaintainer={currentMaintainer}
                    setCurrentMaintainer={setCurrentMaintainer}
                    setIsModalOpen={setIsModalOpen}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Maintainer
