import React, { useEffect, useState } from 'react';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { HiOutlineCalendar, HiOutlineUser, HiOutlineClock } from 'react-icons/hi'; // Thin icons
import useDashboard from '../../../services/useDashboard';

const Head = () => {
  const { getHead } = useDashboard();
  const [data, setData] = useState(null);

  const fetchHead = async () => {
    try {
      const response = await getHead();
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchHead();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Placeholder while fetching data
  }

  const {
    total_sales,
    sales_growth: { year, month, week },
    new_users: { month: newUsers, growth },
  } = data;

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div>
          <h2 className="text-sm font-bold text-subheading">Dashboard</h2>
          <h2 className="text-3xl font-bold">Salon Dashboard</h2>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-2 py-4">
        {/* Total Sales */}
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">Total Sales</h2>
            <div className="flex flex-col">
              <h2>₹{total_sales.year.toFixed(2)}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({year.change.toFixed(2)} / {year.percentage.toFixed(2)}%)
                </h2>
                {year.change >= 0 ? (
                  <FaArrowTrendUp color="green" className="mx-2" />
                ) : (
                  <FaArrowTrendDown color="red" className="mx-2" />
                )}
              </div>
            </div>
          </div>
          <LiaRupeeSignSolid size={50} color="gray" />
        </div>

        {/* Current Month */}
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">Current Month</h2>
            <div className="flex flex-col">
              <h2>₹{total_sales.month.toFixed(2)}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({month.change.toFixed(2)} / {month.percentage.toFixed(2)}%)
                </h2>
                {month.change >= 0 ? (
                  <FaArrowTrendUp color="green" className="mx-2" />
                ) : (
                  <FaArrowTrendDown color="red" className="mx-2" />
                )}
              </div>
            </div>
          </div>
          <HiOutlineCalendar size={50} color="gray" />
        </div>

        {/* Current Week */}
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">Current Week</h2>
            <div className="flex flex-col">
              <h2>₹{total_sales.week.toFixed(2)}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({week.change.toFixed(2)} / {week.percentage.toFixed(2)}%)
                </h2>
                {week.change >= 0 ? (
                  <FaArrowTrendUp color="green" className="mx-2" />
                ) : (
                  <FaArrowTrendDown color="red" className="mx-2" />
                )}
              </div>
            </div>
          </div>
          <HiOutlineClock size={50} color="gray" />
        </div>

        {/* New Users */}
        <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold">New Users</h2>
            <div className="flex flex-col">
              <h2>{newUsers}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({growth.change} / {growth.percentage.toFixed(2)}%)
                </h2>
                {growth.change >= 0 ? (
                  <FaArrowTrendUp color="green" className="mx-2" />
                ) : (
                  <FaArrowTrendDown color="red" className="mx-2" />
                )}
              </div>
            </div>
          </div>
          <HiOutlineUser size={50} color="gray" />
        </div>
      </div>
    </div>
  );
};

export default Head;
