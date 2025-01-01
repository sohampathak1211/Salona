import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'

const EditSalonModal = ({ isOpen, setIsOpen, salon, updateSalon, fetchSalon }) => {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (salon) {
      const { created_at, ...editableData } = salon
      setFormData({ ...editableData })
    }
  }, [salon])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await updateSalon(formData)
    fetchSalon()
    if (response.error) {
      toast.error('Failed to update salon details')
    } else {
      toast.success('Salon details updated successfully')
      setIsOpen(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold mb-4">Edit Salon Details</Dialog.Title>
                <div className="flex space-x-6">
                  <div className="w-2/3 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                          name="description"
                          value={formData.description || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="w-1/3 space-y-4">
                    <div>
                      <label className="block text-gray-700">Instagram</label>
                      <div className="flex items-center space-x-2">
                        <FaInstagram className="text-pink-600" size={20} />
                        <input
                          type="text"
                          name="instagram_acc"
                          value={formData.instagram_acc || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700">Facebook</label>
                      <div className="flex items-center space-x-2">
                        <FaFacebook className="text-blue-600" size={20} />
                        <input
                          type="text"
                          name="facebook_acc"
                          value={formData.facebook_acc || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700">WhatsApp</label>
                      <div className="flex items-center space-x-2">
                        <FaWhatsapp className="text-green-500" size={20} />
                        <input
                          type="text"
                          name="whatsapp_link"
                          value={formData.whatsapp_link || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700">Share Location</label>
                      <input
                        type="text"
                        name="share_location"
                        value={formData.share_location || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditSalonModal
