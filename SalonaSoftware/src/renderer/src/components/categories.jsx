import React from 'react'
import { SiMusicbrainz } from 'react-icons/si'
import { GrSettingsOption } from 'react-icons/gr'
import { FaUsers } from 'react-icons/fa'
import { RiColorFilterFill } from 'react-icons/ri'
import { IoMdBookmarks } from 'react-icons/io'
import { MdAutoGraph } from 'react-icons/md'
import { IoStorefrontSharp } from 'react-icons/io5'
import { PiScissorsFill } from 'react-icons/pi'
import { MdCleaningServices } from 'react-icons/md'
import { GiTicket } from 'react-icons/gi'

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
      name: 'Billing',
      icon: <IoMdBookmarks className="transition-all duration-500" size={25} />,
      link: '/bill'
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
      id: 4,
      name: 'Coupons',
      icon: <GiTicket className="transition-all duration-500" size={25} />,
      link: '/coupons'
    },
    {
      id: 5,
      name: 'Customers',
      icon: <FaUsers className="transition-all duration-500" size={25} />,
      link: '/customer'
    },
    {
      id: 6,
      name: 'Products',
      icon: <IoStorefrontSharp className="transition-all duration-500" size={25} />,
      link: '/product'
    },
    {
      id: 7,
      name: 'Music',
      icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
      link: '/music'
    }
    // {
    //   id: 7,
    //   name: 'Invoice',
    //   icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
    //   link: '/invoice'
    // },
    // {
    //   id: 8,
    //   name: 'Modern Invoice',
    //   icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
    //   link: '/moderninvoice'
    // },
  ]
  const options = [
    // {
    //   id: 1,
    //   name: 'SignIn',
    //   icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
    //   link: '/signin'
    // },
    // {
    //   id: 2,
    //   name: 'SignUp',
    //   icon: <SiMusicbrainz className="transition-all duration-500" size={25} />,
    //   link: '/signup'
    // },
    {
      id: 0,
      name: 'Settings',
      icon: <GrSettingsOption className="transition-all duration-500" size={25} />,
      link: 'settings'
    }
  ]
  return { categories, options }
}

export default useAssets
