// i

import React, { Fragment, useState, useEffect } from 'react'
import CreateProduct from './CreateProduct'
import { AiFillShop } from 'react-icons/ai'
import { Dialog, Transition } from '@headlessui/react'
import EditProduct from './EditProduct'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'
import { FaCartPlus } from 'react-icons/fa'
import useProduct from '../../services/useProduct'

const Product = () => {
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [products, setProducts] = useState([])
  const { getSalonProducts } = useProduct()

  const getProducts = async () => {
    const proData = await getSalonProducts()
    setProducts(proData)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-5">
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
          <h2 className="w-full bg-white p-5 text-xl font-bold items-center flex flex-row gap-2">
            <div>
              <FaCartPlus size={18} fontWeight={20} />
            </div>
            <div> Product Details</div>
          </h2>

          <div className="max-h-[620px] overflow-y-scroll">
            {' '}
            {/* Add this wrapper */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-subheading bg-white border-b">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Expiry Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Branch Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 && products?.map((item) => (
                  <tr key={item.id} className="bg-white text-large">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 break-words max-w-xs"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4 text-wrap break-words">{item.brand}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">₹{item.price}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.gender}</td>
                    <td className="px-6 py-4">{new Date(item.expiry_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 max-w-xs break-words">{item.description}</td>
                    <td className="px-6 py-4">{item.branch?.address}</td>
                    <td className="px-6 py-4 flex flex-row">
                      <button className="text-black bg-yellow-400 px-2 p-1 mr-4 rounded-md items-center flex flex-row gap-1 mt-4">
                        <div>
                          <FaRegEdit />
                        </div>
                        <div>Edit</div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                  <CreateProduct productRefetch={getProducts}/>
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
                  <EditProduct productRefetch={getProducts}/>
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
