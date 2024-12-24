import React, { useState } from 'react';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    gender: '',
    expiry_date: '',
    description: '',
    branch: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-bold mb-1">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="brand" className="text-sm font-bold mb-1">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm font-bold mb-1">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm font-bold mb-1">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity" className="text-sm font-bold mb-1">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="gender" className="text-sm font-bold mb-1">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="expiry_date" className="text-sm font-bold mb-1">Expiry Date</label>
        <input
          type="date"
          id="expiry_date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col col-span-2">
        <label htmlFor="description" className="text-sm font-bold mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded-md"
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="branch" className="text-sm font-bold mb-1">Branch ID</label>
        <input
          type="number"
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          className="text-black bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
        >
         Add Product
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
