import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { packageService } from "../services/packageService";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      console.log('Current User:', currentUser);

      if (!currentUser || !currentUser._id) {
        setError("No user ID found");
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setUserId(currentUser._id);

      
      await fetchUserBookings(currentUser._id);
    } catch (error) {
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  const fetchUserBookings = async (userId) => {
    console.log('Fetching bookings for userId:', userId);
    
    try {
      if (!userId) {
        throw new Error("No user ID provided");
      }

      const bookingsData = await packageService.getMyBookings(userId);
      console.log('Fetched bookings:', bookingsData);
      
      setBookings(bookingsData || []); 
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError("Failed to fetch user bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 ">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
          <img
            src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
          />
          <h2 className="text-2xl font-bold text-white">
            {user?.name || "Name not available"}
          </h2>
          <p className="text-blue-100">{user?.email || "Email not available"}</p>
        </div>

       
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">My Bookings</h3>
          
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking._id} 
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  
                  <div className="w-full">
                    <img 
                      src={booking.image || "https://via.placeholder.com/150"} 
                      alt={booking.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                 
                  <div className="w-full p-4">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {booking.title || "Unnamed Package"}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {booking.description && booking.description.length > 100 
                        ? `${booking.description.substring(0, 100)}...` 
                        : booking.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-green-600 font-semibold">
                          Price: ${booking.price || 'N/A'}
                        </p>
                        <p className="text-gray-500">
                          Available Dates: {booking.availableDates 
                            ? booking.availableDates.map(date => 
                                new Date(date).toLocaleDateString()
                              ).join(', ')
                            : 'No dates available'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-100 rounded-lg">
              <p className="text-gray-600 text-lg">No bookings found</p>
              <p className="text-gray-500 mt-2">Explore our exciting packages and book your next adventure!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}