import { Switch } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import useMaintainer from '../../../services/useMaintainer'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { maintianerEditMaintainer } from '../../../slices/maintainerSlice'

const MaintainerCard = ({ maintainer, onEdit, onDelete }) => {
  return (
    <div className="w-full rounded-2xl bg-white border-b border-gray-300 p-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{maintainer.name}</h3>
        <p className="text-sm text-gray-600">Email: {maintainer.email}</p>
        <p className="text-sm text-gray-600">Phone: {maintainer.phone}</p>
        <p className="text-sm text-gray-600">Branch: {maintainer.branch.address}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-4 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        {/* <div className="py-16">
          <Switch
            checked={enabled}
            onChange={setEnabled} // Update state directly
            className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div> */}
      </div>
    </div>
  )
}

export default MaintainerCard
