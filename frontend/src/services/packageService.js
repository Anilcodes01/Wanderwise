import { api, handleApiError } from "./api.js";




export const packageService = {
  
  async getAllPackages() {
    try {
      const response = await api.get("/getAllTours");
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getSpecificPackage(id) {
    try {
      const response = await api.get(`/packages/${id}`);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  async bookPackage(bookingData) {
    try {
      const response = await api.post("/bookPackage", bookingData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  async getMyBookings(userId) {
    try {
      const response = await api.get(`/getMyPackage/${userId}`);
      
    
      if (response.data.success === false) {
       
        if (response.data.message === "No bookings found for this user") {
          return [];
        }
        
        
        throw new Error(response.data.message);
      }
      
      
      return response.data.packages || [];
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
