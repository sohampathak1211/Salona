import React, { useState } from 'react'
import MaintainerCard from './MaintainerCard'
import { GoEye } from 'react-icons/go'
import { GoEyeClosed } from 'react-icons/go'

const Maintainer = () => {
  const [maintainers, setMaintainers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      password: 'ABC@123'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
      password: 'ABC@123'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alicej@example.com',
      phone: '456-789-0123',
      password: 'ABC@123'
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bobbrown@example.com',
      phone: '321-654-9870',
      password: 'ABC@123'
    }
  ])
  const [passVis, setPassVis] = useState(true)

  const [currentMaintainer, setCurrentMaintainer] = useState({
    id: null,
    name: '',
    email: '',
    phone: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSave = () => {
    if (currentMaintainer.id) {
      setMaintainers((prev) =>
        prev.map((maintainer) =>
          maintainer.id === currentMaintainer.id ? currentMaintainer : maintainer
        )
      )
    } else {
      setMaintainers((prev) => [...prev, { ...currentMaintainer, id: Date.now() }])
    }
    resetModal()
  }

  const handleDelete = (id) => {
    setMaintainers((prev) => prev.filter((maintainer) => maintainer.id !== id))
  }

  const resetModal = () => {
    setCurrentMaintainer({ id: null, name: '', email: '', phone: '' })
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="w-full flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Salon Maintainers</h2>
        <button
          onClick={() => {
            setCurrentMaintainer({ id: null, name: '', email: '', phone: '' })
            setIsModalOpen(true)
          }}
          className="w-40 text-center py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded"
        >
          Add Maintainer
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              {currentMaintainer.id ? 'Edit Maintainer' : 'Add Maintainer'}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={currentMaintainer.name}
                onChange={(e) =>
                  setCurrentMaintainer({
                    ...currentMaintainer,
                    name: e.target.value
                  })
                }
                className="w-full border border-gray-300 rounded p-2 mb-4"
              />

              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={currentMaintainer.email}
                onChange={(e) =>
                  setCurrentMaintainer({
                    ...currentMaintainer,
                    email: e.target.value
                  })
                }
                className="w-full border border-gray-300 rounded p-2 mb-4"
              />

              <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                value={currentMaintainer.phone}
                onChange={(e) =>
                  setCurrentMaintainer({
                    ...currentMaintainer,
                    phone: e.target.value
                  })
                }
                className="w-full border border-gray-300 rounded p-2 mb-4"
              />

              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <div className="flex">
                <input
                  type={passVis ? 'text' : 'password'}
                  value={currentMaintainer.name}
                  onChange={(e) =>
                    setCurrentMaintainer({
                      ...currentMaintainer,
                      password: e.target.value
                    })
                  }
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <div
                  className="bg-gray-100 border-[1px] border-gray-300 mb-4 w-[45px] h-[42px] flex justify-center items-center rounded-r-lg"
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
        </div>
      )}
    </div>
  )
}

export default Maintainer
