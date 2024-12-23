import { Dialog, Listbox, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { GoEye, GoEyeClosed } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import useMaintainer from '../../../../services/useMaintainer'
import { toast } from 'react-toastify'
import { maintainerAddMaintainer } from '../../../../slices/maintainerSlice'

const AddMaintainer = ({ currentMaintainer, setCurrentMaintainer, setIsModalOpen }) => {
  const selectBranch = useSelector((state) => state.branch.result)
  const [selected, setSelected] = useState(selectBranch?.[0] || {})
  const [passVis, setPassVis] = useState(false)
  const { createMaintainer } = useMaintainer()
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectBranch.length > 0) {
      setSelected(selectBranch[0])
    }
  }, [selectBranch])

  const handleSave = async () => {
    // Save logic here
    // Reset the modal after saving
    const payload = {
      ...currentMaintainer,
      branch: selected.id
    }
    const data = await createMaintainer(payload)
    console.log('Save Maintainer call ', data)
    if (data.error) {
      toast.info(data.error)
      return
    }
    dispatch(maintainerAddMaintainer(data))
    resetModal()
  }

  const resetModal = () => {
    setCurrentMaintainer({ id: null, name: '', email: '', phone: '' })
    setPassVis(false)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white rounded-lg w-full">
      <div>
        <label className="block text-sm font-medium text-gray-900">Category</label>
        <Listbox value={selected} onChange={setSelected} className="pb-4">
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default bg-white py-[10px] pl-3 pr-10 text-left border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold">
              <span className="block truncate">{selected?.address || 'Select a branch'}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FaChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5">
                {selectBranch?.map((branch, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none p-2 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={branch}
                  >
                    <span className="block truncate">{branch.address}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={currentMaintainer?.name}
          onChange={(e) => setCurrentMaintainer({ ...currentMaintainer, name: e.target.value })}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={currentMaintainer?.email}
          onChange={(e) => setCurrentMaintainer({ ...currentMaintainer, email: e.target.value })}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
        <input
          type="text"
          value={currentMaintainer?.phone}
          onChange={(e) => setCurrentMaintainer({ ...currentMaintainer, phone: e.target.value })}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
        <div className="flex">
          <input
            type={passVis ? 'text' : 'password'}
            value={currentMaintainer?.password}
            onChange={(e) =>
              setCurrentMaintainer({ ...currentMaintainer, password: e.target.value })
            }
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div
            className="bg-gray-100 border-[1px] border-gray-300 mb-4 w-[45px] h-[42px] flex justify-center items-center rounded-r-lg cursor-pointer"
            onClick={() => setPassVis((prev) => !prev)}
          >
            {passVis ? <GoEye /> : <GoEyeClosed />}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={resetModal}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default AddMaintainer
