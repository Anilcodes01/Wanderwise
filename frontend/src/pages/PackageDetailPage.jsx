import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { packageService } from "../services/packageService";
import BookingModal from "../components/BookingModal";
import { Calendar, DollarSign, MapPin } from "lucide-react";

export default function PackageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      const fetchedPackageDetails = await packageService.getSpecificPackage(id);
      setPackageDetails(fetchedPackageDetails);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch package details.");
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  useEffect(() => {
    fetchPackageDetails();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {error}
    </div>
  );

  const { title, description, image, price, availableDates } = packageDetails;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl overflow-hidden">
       
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full">
            <DollarSign className="inline-block mr-1" size={20} />
            {price}
          </div>
        </div>

      
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Calendar className="mr-3 text-blue-600" size={24} />
                <div>
                  <strong>Available Dates:</strong>
                  <div className="text-gray-600">
                    {availableDates?.length
                      ? availableDates.map((date) => (
                          <span 
                            key={date} 
                            className="inline-block mr-2 bg-blue-50 px-2 py-1 rounded"
                          >
                            {new Intl.DateTimeFormat("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(date))}
                          </span>
                        ))
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        packageDetails={packageDetails}
      />
    </div>
  );
}