import React from 'react';
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ 
  id, 
  title, 
  image, 
  description, 
  price, 
  availableDates, 
  className 
}) => {
  const navigate = useNavigate();

 
  const truncateDescription = (desc, maxLength = 100) => {
    return desc.length > maxLength 
      ? `${desc.substring(0, maxLength)}...` 
      : desc;
  };

  
  const formatDates = (dates) => {
    return dates && dates.length > 0
      ? dates.map(date => new Date(date).toLocaleDateString()).join(', ')
      : 'Dates not specified';
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col ${className}`}
    >
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image || "https://via.placeholder.com/400x250"} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm">
          ${price}
        </div>
      </div>

     
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">
          {truncateDescription(description)}
        </p>

      
        <div className="text-sm text-gray-500 mb-4">
          <span className="font-medium">Available Dates:</span>
          <p>{formatDates(availableDates)}</p>
        </div>

      
        <button 
          onClick={() => navigate(`/package/${id}`)}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 
          transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PackageCard;