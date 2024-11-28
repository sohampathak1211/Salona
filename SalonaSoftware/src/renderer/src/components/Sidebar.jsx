import React from 'react'
import { GiBurningEye } from 'react-icons/gi'
import { MdOutlineArrowBackIosNew, MdSportsVolleyball } from 'react-icons/md'
import { TbChartArrowsVertical } from 'react-icons/tb'
import useAssets from './categories.jsx'
import { GiEvilEyes } from 'react-icons/gi'
import '../assets/main.css'
import Logo from '../assets/logo.png?react'
import { Link } from 'react-router-dom'

const Sidebar = ({ sidebar, setSidebar }) => {
  const { categories, options } = useAssets()
  return (
    <div className="flex flex-1 h-full flex-col justify-between py-4 relative">
      <div className="">
        <div className="w-full cursor-pointer flex flex-1 justify-between pb-5">
          <div className="w-full">
            <img src={Logo} />
          </div>
          <div
            className={`transition-all duration-300 absolute h-8 w-8 -right-[20px] rounded-full z-50 top-[80px] bg-yellow-300 flex justify-center items-center ${
              sidebar ? '-rotate-45' : 'rotate-45'
            }`}
            onClick={() => setSidebar((prev) => !prev)}
          >
            <MdOutlineArrowBackIosNew
              className={`transform transition-transform duration-1000 ${
                sidebar ? 'rotate-45' : 'rotate-[135deg]'
              }`}
              size={18}
            />
          </div>
        </div>
        <div className="mt-2">
          {categories.map((cat) => (
            <Link
              to={`/auth${cat.link}`}
              className="flex items-center py-2 px-2 hover:bg-slate-100"
              key={cat.id}
            >
              <div className="w-8 h-8 flex ml-2 justify-center items-center">{cat.icon}</div>
              <h2
                className={`ml-1 transition-all duration-500 transform ${
                  sidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                } font-bold pl-2`}
              >
                {cat.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full">
        {options.map((cat) => (
          <Link to={cat.link} className="flex px-4 items-center mt-4" key={cat.id}>
            <div className="w-8 h-8 flex justify-center items-center">{cat.icon}</div>
            <h2
              className={`ml-1 transition-all duration-500 transform ${
                sidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              } font-bold pl-2`}
            >
              {cat.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
