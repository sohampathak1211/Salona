import React, { Fragment, useState, useEffect } from 'react'
import CreateProduct from './CreateProduct'
import { AiFillShop } from 'react-icons/ai'
import { Dialog, Transition } from '@headlessui/react'
import EditProduct from './EditProduct'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'
import { FaCartPlus } from 'react-icons/fa'
import useProduct from '../../services/useProduct'
import useAssets from '../../components/categories'
import { IoSearchSharp } from 'react-icons/io5'
import { branchFailed, branchRequest, branchSuccess, selectBranch } from '../../slices/branchSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import useBranch from '../../services/useBranch'
import ViewProduct from './ViewProduct'

const Product = () => {
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const { getSalonBranches } = useBranch()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]) // Filtered product list
  const [query, setQuery] = useState('') // Search query
  const branches = useSelector(selectBranch)

  const { getSalonProducts } = useProduct()
  const { isAdmin } = useAssets()
  const dispatch = useDispatch()

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [viewModal, setViewModal] = useState(false)

  const getProducts = async () => {
    const proData = await getSalonProducts()
    setProducts(proData)
    setFilteredProducts(proData)
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
    if (branches.length <= 0) {
      getBranches()
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [])

  // Filter products when the query changes
  useEffect(() => {
    if (query === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => {
        const queryLower = query.toLowerCase()
        return (
          product.name?.toLowerCase().includes(queryLower) ||
          product.brand?.toLowerCase().includes(queryLower) ||
          product.category?.toLowerCase().includes(queryLower) ||
          product.price?.toString().toLowerCase().includes(queryLower) ||
          product.quantity?.toString().toLowerCase().includes(queryLower) ||
          product.gender?.toLowerCase().includes(queryLower) ||
          new Date(product.expiry_date).toLocaleDateString().toLowerCase().includes(queryLower) ||
          product.description?.toLowerCase().includes(queryLower) ||
          product.branch?.address?.toLowerCase().includes(queryLower)
        )
      })
      setFilteredProducts(filtered)
    }
  }, [query, products])

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setViewModal(true)
  }

  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold text-subheading">Product</h2>
            <h2 className="text-3xl font-bold">Products</h2>
          </div>
          {isAdmin && (
            <button
              onClick={() => setCreate(true)}
              className="m-3 mr-10 bg-accent px-5 py-2 rounded-xl text-black font-bold bg-yellow-500 hover:bg-yellow-500 transition-colors"
            >
              Add a new Product
            </button>
          )}
        </div>

        <div className="w-[400px]  h-[50px] border border-black rounded-md items-center flex flex-row gap-3">
          <IoSearchSharp size={22} className="ml-4" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-2 py-2 text-black mr-1 border:none outline-none"
            placeholder="Search Product"
          />
        </div>

        <div className="relative rounded-2xl overflow-hidden mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold">Product Details</h2>
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-subheading bg-white border-b sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-white">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 bg-white">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 bg-white">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 bg-white">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 bg-white">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => (
                  <tr 
                    key={item.product_id} 
                    className="bg-white text-large cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleViewProduct(item)}
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[200px] truncate">
                      {item.name}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[150px] truncate">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[250px] truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.stock}
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
                  <CreateProduct productRefetch={getProducts} setCreate={setCreate} />
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
                  <EditProduct productRefetch={getProducts} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ViewProduct 
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        product={selectedProduct}
      />
    </div>
  )
}

export default Product
