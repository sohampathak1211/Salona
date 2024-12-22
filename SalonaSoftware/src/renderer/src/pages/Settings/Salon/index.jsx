import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { salonFailed, salonRequest, salonSuccess, selectSalon } from '../../../slices/salonSlice'
import useSalon from '../../../services/useSalon'
import { toast } from 'react-toastify'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import Image from '../../../assets/logo.png?react'
import EditSalonModal from './EditSalon'

const Salon = () => {
  const salon = useSelector(selectSalon)
  const dispatch = useDispatch()
  const { getSalon, updateSalon } = useSalon()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchSalon = async () => {
    dispatch(salonRequest())
    const data = await getSalon()
    if (data.error) {
      dispatch(salonFailed(data.error))
      toast.info("You don't have branches. Open the settings page and add a branch to continue")
      return
    }
    dispatch(salonSuccess(data))
  }

  useEffect(() => {
    fetchSalon()
  }, [])

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-600">Salon Details</h1>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Salon Details
        </button>
      </div>
      <div className="bg-white flex p-6 rounded-lg shadow">
        <div className="w-2/3 flex pr-6">
          <div className="w-36 h-36 mr-10 rounded-md bg-black">
            <img src={Image} alt="Salon Logo" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-700">{salon?.name}</h2>
            <p className="text-gray-600 text-sm pl-2">{salon?.email}</p>
            <p className="text-gray-600 text-sm pl-2">{salon?.phone}</p>
            <p className="text-gray-600 pt-2 pl-2">{salon?.description}</p>
            <p className="text-gray-600 pl-2">
              Since {new Date(salon?.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="w-1/3 space-y-4">
          {salon?.instagram_acc && (
            <div className="flex items-center space-x-2">
              <FaInstagram className="text-pink-500" size={20} />
              <a
                href={salon.instagram_acc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                Instagram
              </a>
            </div>
          )}
          {salon?.facebook_acc && (
            <div className="flex items-center space-x-2">
              <FaFacebook className="text-blue-600" size={20} />
              <a
                href={salon.facebook_acc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                Facebook
              </a>
            </div>
          )}
          {salon?.whatsapp_link && (
            <div className="flex items-center space-x-2">
              <FaWhatsapp className="text-green-500" size={20} />
              <a
                href={salon.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                WhatsApp
              </a>
            </div>
          )}
          {salon?.share_location && (
            <div className="flex items-center space-x-2">
              <MdLocationOn className="text-red-500" size={20} />
              <a
                href={salon.share_location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                Google Maps
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditSalonModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        salon={salon}
        updateSalon={updateSalon}
      />
    </div>
  )
}

export default Salon
