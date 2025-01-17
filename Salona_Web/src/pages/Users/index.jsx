import React, { useEffect, useState } from 'react';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import useCustomer from '../../services/useCustomer';
import { toast } from 'react-toastify';

const Customer = () => {
  const [VendorDetails, setVendorDetails] = useState([]);
  const { getSalonCustomer } = useCustomer();

  const fetchUser = async () => {
    try {
      const data = await getSalonCustomer();
      console.log('Customer data', data);

      if (data?.error) {
        toast.error('Error in the backend request: ' + data.error);
        setVendorDetails([]); // Fallback to empty array
      } else if (Array.isArray(data)) {
        setVendorDetails(data);
      } else {
        toast.error('Unexpected data format from the backend.');
        setVendorDetails([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      toast.error('Failed to fetch customer data.');
      setVendorDetails([]); // Fallback to empty array
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-1 justify-center relative">
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold text-subheading">Customer</h2>
            <h2 className="text-3xl font-bold">Customers</h2>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-x-auto mt-5">
          <h2 className="w-full bg-white p-5 text-xl font-bold">Customer Details</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-subheading bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {VendorDetails.length > 0 ? (
                VendorDetails.map((item) => (
                  <tr key={item.id} className="bg-white text-large">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.name || 'N/A'}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.phone || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">No customer data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
