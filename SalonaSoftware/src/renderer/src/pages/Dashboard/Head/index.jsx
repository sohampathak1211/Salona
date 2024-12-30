import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SiVirustotal } from 'react-icons/si'
import { PiWaveTriangleDuotone } from 'react-icons/pi'
import { LiaRupeeSignSolid } from 'react-icons/lia'
// https://seantheme.com/droplet/#
// https://lifeinbrand.home.pl/webapplayers/inspinia_admin-v2.9.4/invoice.html
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
// https://wrapbootstrap.com/category/templates/admin-templates
import { FaArrowTrendUp } from 'react-icons/fa6'
import { FaArrowTrendDown } from 'react-icons/fa6'

const Head = () => {

  
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div>
          <h2 className="text-sm font-bold text-subheading">Dashboard</h2>
          <h2 className="text-3xl font-bold">Salon Dashboard</h2>
        </div>
        {/* <div className="flex items-center">
          <div className="text-right">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Refresh at
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 bg-black origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    Now
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-gray-100/30" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    10 min
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    30 min
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    1 hour
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div> */}
      </div>
      <div className="w-full grid grid-cols-4 gap-2 py-4">
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">Total Sales</h2>
            <div className="flex items-center">
              <h2 className="pl-2">Rs. 26,500</h2>
              {/* <div className="flex items-end">
                <h2 className="text-xs">(250 / 0.20%)</h2>
                <FaArrowTrendUp color="green" className="mx-2" />
              </div> */}
            </div>
          </div>
          <LiaRupeeSignSolid size={50} color="gray" />
        </div>
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">Current Month</h2>
            <div className="flex items-center">
              <h2 className="pl-2">Rs. 26,500</h2>
              <div className="flex items-end">
                <h2 className="text-xs">(250 / 0.20%)</h2>
                <FaArrowTrendUp color="green" className="mx-2" />
              </div>
            </div>
          </div>
          <LiaRupeeSignSolid size={50} color="gray" />
        </div>
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">Current Week</h2>
            <div className="flex items-center">
              <h2 className="pl-2">Rs. 26,500</h2>
              <div className="flex items-end">
                <h2 className="text-xs">(250 / 0.20%)</h2>
                <FaArrowTrendDown color="red" className="mx-2" />
              </div>
            </div>
          </div>
          <LiaRupeeSignSolid size={50} color="gray" />
        </div>
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">New Users</h2>
            <div className="flex items-center">
              <h2 className="pl-2">Rs. 26,500</h2>
              <div className="flex items-end">
                <h2 className="text-xs">(0.20%)</h2>
                <FaArrowTrendUp color="green" className="mx-2" />
              </div>
            </div>
          </div>
          <LiaRupeeSignSolid size={50} color="gray" />
        </div>
      </div>
    </div>
  )
}

export default Head
