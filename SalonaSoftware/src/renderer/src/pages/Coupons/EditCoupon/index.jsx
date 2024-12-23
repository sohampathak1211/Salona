import React, { useState, useEffect } from 'react';

const EditCoupon = ({ setEdit, couponToEdit, updateCouponDetails }) => {
  const [coupon, setCoupon] = useState({
    code: '',
    discount_percentage: 0,
    discount_amount: 0,
    valid_till: '',
    valid_services: [],
    valid_combos: [],
    by_percent: true,
  });

  useEffect(() => {
    if (couponToEdit) {
      setCoupon(couponToEdit);
    }
  }, [couponToEdit]);

  const handleClose = () => {
    setEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCoupon({ ...coupon, [name]: checked });
  };

  const handleSubmit = () => {
    updateCouponDetails(coupon);
    handleClose();
  };

  return (
    <div
      id="edit-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">Edit Coupon</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Coupon Code</label>
              <input
                type="text"
                name="code"
                value={coupon.code}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Discount Percentage</label>
              <input
                type="number"
                name="discount_percentage"
                value={coupon.discount_percentage}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={!coupon.by_percent}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Discount Amount</label>
              <input
                type="number"
                name="discount_amount"
                value={coupon.discount_amount}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={coupon.by_percent}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Valid Till</label>
              <input
                type="date"
                name="valid_till"
                value={coupon.valid_till}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="by_percent"
                checked={coupon.by_percent}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-900">Discount by Percentage</label>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoupon;
