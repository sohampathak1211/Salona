import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { AiFillShop } from 'react-icons/ai'

const ViewService = ({ isOpen, onClose, service }) => {
  if (!service) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <Dialog.Panel className="mx-auto rounded-2xl bg-white p-6 shadow-xl">
                <Dialog.Title className="flex items-center text-xl font-semibold text-gray-900 mb-4">
                  <AiFillShop size={25} className="mr-2 text-gray-600" />
                  Service Details
                </Dialog.Title>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Branch Name</h3>
                      <p className="mt-1 text-lg text-gray-900">{service.branch.address}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Service Name</h3>
                      <p className="mt-1 text-lg text-gray-900">{service.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Category</h3>
                      <p className="mt-1 text-lg text-gray-900">{service.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Price</h3>
                      <p className="mt-1 text-lg text-gray-900">₹{service.price}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {Math.floor(service.duration / 60)}h {service.duration % 60}m
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-1 text-lg text-gray-900">{service.description}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default ViewService 