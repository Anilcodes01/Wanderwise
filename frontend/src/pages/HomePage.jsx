import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";
import { packageService } from "../services/packageService";
import { authService } from "../services/authService";

export default function HomePage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const fetchedPackages = await packageService.getAllPackages();
      setPackages(fetchedPackages);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch packages");
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch user details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
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
    <div className="container mx-auto  px-4 ">
     
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 
          bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
          text-center mb-4 leading-tight">
          {user 
            ? `Discover Your Next Adventure, ${user.name}!` 
            : "Discover Your Next Adventure"}
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Explore extraordinary destinations, create unforgettable memories, and embark on journeys that will last a lifetime.
        </p>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg._id}
            id={pkg._id}
            title={pkg.title}
            image={pkg.image}
            description={pkg.description}
            price={pkg.price}
            availableDates={pkg.availableDates}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          />
        ))}
      </div>

    
      {packages.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Packages Available
          </h2>
          <p className="text-gray-500 mb-6">
            We're working on adding exciting new travel experiences. 
            Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}