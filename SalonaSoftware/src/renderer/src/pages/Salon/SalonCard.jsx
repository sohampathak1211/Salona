import Both from '../../assets/hairfemale3.jpg?react'

const SalonCard = ({ salon, onClick }) => {
  return (
    <div
      className="bg-white flex shadow-md p-4 rounded-lg w-full h-60 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <img src={Both} alt={salon.name} className="w-1/2 h-full object-cover rounded-md" />
      <div className="p-2 h-full flex flex-col justify-between">
        <div>
          <h5 className="text-lg font-bold mb-2 text-yellow-600">{salon.name}</h5>
          <p className="text-gray-600 mb-1">{salon.address}</p>
          <p className="text-gray-600 mb-1">Phone: {salon.phone}</p>
          <p className="text-gray-600 mb-2">{salon.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <a
            href={salon.facebook_acc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Facebook
          </a>
          <a
            href={salon.instagram_acc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 underline"
          >
            Instagram
          </a>
          <a
            href={salon.whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            WhatsApp
          </a>
          <a
            href={salon.share_location}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline"
          >
            Location
          </a>
        </div>
      </div>
    </div>
  )
}

export default SalonCard
