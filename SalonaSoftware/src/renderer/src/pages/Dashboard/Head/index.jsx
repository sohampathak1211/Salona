import React, { useEffect, useState } from 'react';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { HiOutlineCalendar, HiOutlineUser, HiOutlineClock } from 'react-icons/hi';
import useDashboard from '../../../services/useDashboard';

const Head = () => {
  const { getHead } = useDashboard();
  const [data, setData] = useState(null);

  const fetchHead = async () => {
    try {
      const response = await getHead();
      setData(response || {}); // Ensure response is always an object
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({}); // Set to an empty object if an error occurs
    }
  };

  useEffect(() => {
    fetchHead();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Placeholder while fetching data
  }

  // Fallback default values
  const {
    total_sales = { year: 0, month: 0, week: 0 },
    sales_growth = {
      year: { change: 0, percentage: 0 },
      month: { change: 0, percentage: 0 },
      week: { change: 0, percentage: 0 },
    },
    new_users = { month: 0, growth: { change: 0, percentage: 0 } },
  } = data;

  // Safely access nested properties and avoid null/undefined issues
  const safeToFixed = (value) => (value !== null && value !== undefined ? value.toFixed(2) : '0.00');

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
              <h2>₹{safeToFixed(total_sales.year)}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({safeToFixed(sales_growth.year.change)} / {safeToFixed(sales_growth.year.percentage)}%)
                </h2>
                {sales_growth.year.change >= 0 ? (
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
              <h2>₹{safeToFixed(total_sales.month)}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({safeToFixed(sales_growth.month.change)} / {safeToFixed(sales_growth.month.percentage)}%)
                </h2>
                {sales_growth.month.change >= 0 ? (
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
              <h2>₹{safeToFixed(total_sales.week)}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({safeToFixed(sales_growth.week.change)} / {safeToFixed(sales_growth.week.percentage)}%)
                </h2>
                {sales_growth.week.change >= 0 ? (
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
              <h2>{new_users.month}</h2>
              <div className="flex items-end">
                <h2 className="text-xs">
                  ({safeToFixed(new_users.growth.change)} / {safeToFixed(new_users.growth.percentage)}%)
                </h2>
                {new_users.growth.change >= 0 ? (
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
