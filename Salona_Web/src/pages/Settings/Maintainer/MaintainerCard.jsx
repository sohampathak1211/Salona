import React from "react";

const MaintainerCard = ({ maintainer, onEdit, onDelete }) => {
  return (
    <div className="w-full bg-white border-b border-gray-300 p-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{maintainer.name}</h3>
        <p className="text-sm text-gray-600">Email: {maintainer.email}</p>
        <p className="text-sm text-gray-600">Phone: {maintainer.phone}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MaintainerCard;
