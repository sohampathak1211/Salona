const BranchCard = ({ branch}) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg"
    >
      <h2 className="text-xl font-semibold text-yellow-600">Branch Address:</h2>
      <p>{branch.address}</p>
      <p><strong>Phone:</strong> {branch.phone}</p>
      <p><strong>Description:</strong> {branch.description}</p>
      <p><strong>Created At:</strong> {new Date(branch.created_at).toLocaleString()}</p>
    </div>
  );
};

export default BranchCard;
