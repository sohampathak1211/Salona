import React from 'react'
import { SiMusicbrainz } from 'react-icons/si'
import { GrSettingsOption } from 'react-icons/gr'
import { FaUsers } from 'react-icons/fa'
import { RiColorFilterFill } from 'react-icons/ri'
import { IoMdBookmarks } from 'react-icons/io'
import { MdAutoGraph } from 'react-icons/md'
import { PiScissorsFill } from "react-icons/pi";
import { MdCleaningServices } from "react-icons/md";

const useAssets = () => {
  const categories = [
    {
      id: 0,
      name: 'Dashboard',
      icon: <MdAutoGraph className="transition-all duration-500" size={25} />,
      link: '/'
    },
    {
      id: 1,
      name: 'Appointment',
      icon: <IoMdBookmarks className="transition-all duration-500" size={25} />,
      link: '/appointment'
    },
    {
      id: 2,
      name: 'Services',
      icon: <MdCleaningServices className="transition-all duration-500" size={25} />,
      link: '/service'
    },
    {
      id: 3,
      name: 'Combos',
      icon: <RiColorFilterFill className="transition-all duration-500" size={25} />,
      link: '/combos'
    },
    {
      id: 3,
      name: 'Customers',
      icon: <FaUsers className="transition-all duration-500" size={25} />,
      link: '/customer'
    },
    {
      id: 5,
      name: 'Music',
      icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
      link: '/music'
    },
    {
      id: 6,
      name: 'Salons',
      icon: <PiScissorsFill className="transition-all duration-500" size={25} />,
      link: '/salon'
    },
  ]
  const options = [
    {
      id: 1,
      name: 'SignIn',
      icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
      link: '/signin'
    },
    {
      id: 2,
      name: 'SignUp',
      icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
      link: '/signup'
    },
    {
      id: 0,
      name: 'Settings',
      icon: <GrSettingsOption className="transition-all duration-500" size={25} />,
      link:"settings"
    },
  ]
  return { categories, options }
}

export default useAssets
