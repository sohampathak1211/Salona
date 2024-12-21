import React, { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    border: 0,
    borderRadius: 10,
    backgroundColor: '#FFFFFFFF'
  }
}

const AddSalon = ({ isModalOpen , setIsModalOpen, addSalon }) => {
  const [newSalon, setNewSalon] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    facebook_acc: '',
    instagram_acc: '',
    whatsapp_link: '',
    share_location: '',
    image: ''
  })

  const handleAddSalon = () => {
    setSalons([...salons, { ...newSalon, id: Date.now() }])
    setIsModalOpen(false)
    toast.success('Salon added successfully!')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setNewSalon({ ...newSalon, image: imageURL })
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      style={customStyles}
      onRequestClose={() => setIsModalOpen(false)}
      ariaHideApp={false}
    >
      <div className="flex flex-col h-full justify-between">
        <h2 className="text-lg font-bold mb-4">Add New Salon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-3/4">
          {/* Form Fields in side-by-side layout */}
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Salon Name</label>
              <input
                type="text"
                value={newSalon.name}
                onChange={(e) => setNewSalon({ ...newSalon, name: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={newSalon.phone}
                onChange={(e) => setNewSalon({ ...newSalon, phone: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook</label>
              <input
                type="text"
                value={newSalon.facebook_acc}
                onChange={(e) => setNewSalon({ ...newSalon, facebook_acc: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Link</label>
              <input
                type="text"
                value={newSalon.whatsapp_link}
                onChange={(e) => setNewSalon({ ...newSalon, whatsapp_link: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Share Location</label>
              <input
                type="text"
                value={newSalon.share_location}
                onChange={(e) => setNewSalon({ ...newSalon, share_location: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={newSalon.address}
                onChange={(e) => setNewSalon({ ...newSalon, address: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm h-24 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newSalon.description}
                onChange={(e) => setNewSalon({ ...newSalon, description: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm h-24 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <input
                type="text"
                value={newSalon.instagram_acc}
                onChange={(e) => setNewSalon({ ...newSalon, instagram_acc: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
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
            onClick={handleAddSalon}
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddSalon
