import React, { useState } from 'react'
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../index.css'
import SalonCard from './SalonCard'
import AddSalon from './AddSalon'

const dummySalons = [
  {
    id: 1,
    name: 'Glamorous Cuts',
    address: '1234 Elm Street, Springfield',
    phone: '123-456-7890',
    description: 'Professional haircuts and styling services.',
    facebook_acc: 'https://facebook.com/glamorouscuts',
    instagram_acc: 'https://instagram.com/glamorouscuts',
    whatsapp_link: 'https://wa.me/1234567890',
    share_location: 'https://maps.google.com/?q=1234+Elm+Street',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Stylish Waves',
    address: '5678 Oak Avenue, Metropolis',
    phone: '987-654-3210',
    description: 'Trendy hairstyles and coloring.',
    facebook_acc: 'https://facebook.com/stylishwaves',
    instagram_acc: 'https://instagram.com/stylishwaves',
    whatsapp_link: 'https://wa.me/9876543210',
    share_location: 'https://maps.google.com/?q=5678+Oak+Avenue',
    image: 'https://via.placeholder.com/150'
  }
]

Modal.setAppElement('#root')

const Salon = () => {
  const [salons, setSalons] = useState(dummySalons)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [temp, setTemp] = useState({})

  const currentSalon = async (salon) => {
    console.log('Data', salon)
    const response = await window.electron.ipcRenderer
      .invoke('getAppData', salon)
      .then((d) => setTemp(d))
      .catch((e) => console.log(e))
    console.log('Response', response)
  }

  const cleanLocalStorage = async () => {
    const response = await window.electron.ipcRenderer
      .invoke('setAppData', {})
      .then((d) => setTemp(d))
      .catch((e) => console.log(e))
  }

  const createData = async() => {
    const response = await window.electron.ipcRenderer
      .invoke('setAppData', {name:"Soham Pathak"})
      .then((d) => console.log(d))
      .catch((e) => console.log(e))
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-600" onClick={createData}>Salon Dashboard</h1>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            //  setIsModalOpen(true);
             cleanLocalStorage();
            }}
        >
          Add Salon
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {salons.map((salon) => (
          <SalonCard
            key={salon.id}
            salon={salon}
            onClick={() => {
              currentSalon(salon)
              toast.info(`Navigating to details of ${salon.name}`)
            }}
          />
        ))}
        <h1>{JSON.stringify(temp)}</h1>
      </div>
      <AddSalon isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

export default Salon
