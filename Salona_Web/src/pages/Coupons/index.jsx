import React, { useEffect, useState, Fragment } from 'react'
import CreateCoupon from './CreateCoupon'
import EditCoupon from './EditCoupon'
import useService from '../../services/useService'
import useBranch from '../../services/useBranch'
import { Dialog, Transition } from '@headlessui/react'
import { AiFillShop } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { branchFailed, branchRequest, branchSuccess, selectBranch } from '../../slices/branchSlice'
import { selectService, serviceRequest, serviceSuccess } from '../../slices/serviceSlice'
import { toast } from 'react-toastify'
import { comboRequest, comboSuccess, selectCombo } from '../../slices/comboSLice'
import useCombo from '../../services/useCombo'
import { couponFailed, couponRequest, couponSuccess, selectCoupon } from '../../slices/couponSlice'
import useCoupon from '../../services/useCoupon'
import { LuChevronsRight } from 'react-icons/lu'
import useAssets from '../../components/categories'
import { IoSearchSharp } from 'react-icons/io5'

const Coupons = () => {
  const dispatch = useDispatch()
  const { isAdmin } = useAssets()
  const { getSalonBranches } = useBranch()
  const { getSalonServices } = useService()
  const { getSalonCombos } = useCombo()
  const { getSalonCoupons } = useCoupon()
  const branches = useSelector(selectBranch)
  const services = useSelector(selectService)
  const combos = useSelector(selectCombo)
  const coupons = useSelector(selectCoupon)

  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [couponToEdit, setCouponToEdit] = useState(null)
  const [searchQuery, setSearchQuery] = useState('') // New state for search query

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

  const getServices = async () => {
    dispatch(serviceRequest())
    const serv = await getSalonServices()
    dispatch(serviceSuccess(serv))
  }

  const getCombos = async () => {
    dispatch(comboRequest())
    const comb = await getSalonCombos()
    dispatch(comboSuccess(comb))
  }

  const getCoupons = async () => {
    dispatch(couponRequest())
    const coup = await getSalonCoupons()
    if (coup.error) {
      dispatch(couponFailed(coup.error))
      toast.info(coup.error)
      return
    }
    dispatch(couponSuccess(coup))
  }

  useEffect(() => {
    if (services.length <= 0) {
      getServices()
    }
    if (branches.length <= 0) {
      getBranches()
    }
    if (combos.length <= 0) {
      getCombos()
    }
    if (coupons.length <= 0) {
      getCoupons()
    }
  }, [])

  const handleEditCoupon = (coupon) => {
    setCouponToEdit(coupon)
    setEdit(true)
  }

  const handleDelete = (id) => {
    console.log(`Delete coupon with id: ${id}`)
  }

  const handleServiceOpen = () => {
    if (branches.length <= 0) {
      toast.info("You don't have branches. Open the settings page and add a branch to continue")
      return
    } else {
      setCreate(true)
    }
  }

  const isDateValid = (validTillDate) => {
    const currentDate = new Date() // Current date and time
    const validDate = new Date(validTillDate) // Convert input date to Date object
    return validDate >= currentDate // Returns true if validDate is in the future or today, false otherwise
  }

  const calculateDiscountedPrice = (price, discountPercentage, discountAmount, isByPercent) => {
    return isByPercent
      ? (price - (price * discountPercentage) / 100).toFixed(2)
      : (price - discountAmount).toFixed(2)
  }

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by coupon code
      coupon.valid_services.some(
        (service) => service.name.toLowerCase().includes(searchQuery.toLowerCase()) // Search by service name
      ) ||
      coupon.valid_combos.some(
        (combo) => combo.name.toLowerCase().includes(searchQuery.toLowerCase()) // Search by combo name
      )
  )

  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold text-subheading">Coupon</h2>
            <h2 className="text-3xl font-bold">Coupon</h2>
          </div>
          {isAdmin ? (
            <button
              onClick={handleServiceOpen}
              className="m-3 mr-10 bg-accent px-5 py-2 rounded-xl text-black font-bold bg-yellow-500 hover:bg-yellow-500  transition-colors"
            >
              Add a new Coupon
            </button>
          ) : (
            <Fragment></Fragment>
          )}
        </div>

        <div className="w-[400px]  h-[50px] border border-black rounded-md items-center flex flex-row gap-3">
          <IoSearchSharp size={22} className="ml-4" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2 py-2 text-black mr-1 border:none outline-none"
            placeholder="Search Product"
          />
        </div>

        <div className="relative rounded-2xl overflow-x-auto mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold">Coupon Details</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Coupon Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Benefits
                </th>
                <th scope="col" className="px-6 py-3">
                  Valid Till
                </th>
                <th scope="col" className="px-6 py-3">
                  Valid Services
                </th>
                <th scope="col" className="px-6 py-3">
                  Valid Combos
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="bg-white text-large">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {coupon.code}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {coupon.by_percent
                      ? `${coupon.discount_percentage || 0}% off`
                      : `₹${coupon.discount_amount} off`}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 mr-1 rounded-full ${isDateValid(coupon.valid_till) ? 'bg-green-500' : 'bg-red-500'}`}
                      ></div>{' '}
                      {new Date(coupon.valid_till).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {coupon.valid_services.length > 0
                      ? coupon.valid_services.map((service) => (
                          <div key={service.id} className="flex flex-col gap-1">
                            <span className="font-semibold">{service.name}</span>
                            <span className="text-gray-500 flex items-center text-sm">
                              <s className="pr-2 text-red-500">₹{service.price}</s>{' '}
                              <LuChevronsRight />{' '}
                              <span className="pl-2 text-green-500">
                                ₹
                                {calculateDiscountedPrice(
                                  service.price,
                                  coupon.discount_percentage,
                                  coupon.discount_amount,
                                  coupon.by_percent
                                )}
                              </span>
                            </span>
                          </div>
                        ))
                      : coupon.is_minimum_purchase
                        ? `On purchase of ${coupon.minimum_amount}`
                        : 'None'}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {coupon.valid_combos.length > 0
                      ? coupon.valid_combos.map((combo) => (
                          <div key={combo.id} className="flex flex-col gap-1">
                            <span className="font-semibold">{combo.name}</span>
                            <span className="text-gray-500 flex items-center text-sm">
                              <s className="pr-2 text-red-500">₹{combo.price}</s>{' '}
                              <LuChevronsRight />{' '}
                              <span className="pl-2 text-green-500">
                                ₹
                                {calculateDiscountedPrice(
                                  combo.price,
                                  coupon.discount_percentage,
                                  coupon.discount_amount,
                                  coupon.by_percent
                                )}
                              </span>
                            </span>
                          </div>
                        ))
                      : ''}
                  </td>
                  {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Transition appear show={create} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setCreate(false)}>
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
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-xl pb-2 font-semibold leading-6 text-gray-900"
                  >
                    <AiFillShop size={25} color="gray" className="mr-2" />
                    New Coupon
                  </Dialog.Title>
                  <CreateCoupon setCreate={setCreate} />
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex text-xl pb-2 font-semibold leading-6 text-gray-900"
                  >
                    <AiFillShop size={25} color="gray" className="mr-2" />
                    Edit Coupon
                  </Dialog.Title>
                  <EditCoupon setEdit={setEdit} edit={edit} couponToEdit={couponToEdit} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Coupons
