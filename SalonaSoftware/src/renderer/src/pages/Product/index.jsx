import React, { Fragment, useState } from 'react'
import CreateProduct from './CreateProduct'
import { AiFillShop } from 'react-icons/ai'
import { Dialog, Transition } from '@headlessui/react'
import EditProduct from './EditProduct'

const Product = () => {
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [products, setProducts] = useState([])
  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold text-subheading">Product</h2>
            <h2 className="text-3xl font-bold">Products</h2>
          </div>
          <button
            onClick={() => setCreate(true)}
            className="m-3 mr-10 bg-accent px-5 py-2 rounded-xl text-black font-bold bg-yellow-500 hover:bg-yellow-500 transition-colors"
          >
            Add a new Product
          </button>
        </div>
        <div className="relative rounded-2xl overflow-x-auto mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold" onClick={() => setEdit(true)}>
            Product Details
          </h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item) => (
                <tr key={item.id} className="bg-white text-large">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-normal max-w-xs break-words">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <button className="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Delete</button>
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
                    New Product
                  </Dialog.Title>
                  <CreateProduct />
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-xl pb-2 font-semibold leading-6 text-gray-900"
                  >
                    <AiFillShop size={25} color="gray" className="mr-2" />
                    Edit Product
                  </Dialog.Title>
                  <EditProduct />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Product
