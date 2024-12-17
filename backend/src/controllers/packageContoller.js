import Booking from "../models/bookingSchema.js";
import Package from "../models/PackageModel.js";
import Tour from "../models/PackageModel.js";

export const bookPackages = async (req, res) => {
    try {
      const {userId, customerName, email, phoneNumber, numberOfTravelers, specialRequests, packageId, totalPrice} = req.body;
  
      const bookPackage = await Booking({
        userId,
        customerName,
        email,
        phoneNumber,
        numberOfTravelers,
        specialRequests,
        packageId,
        totalPrice
      });
  
      await bookPackage.save();
  
      return res.status(200).json({
        message: "Package booked successfully, happy journey...!",
        success: true,
        data: bookPackage,
      });
    } catch (error) {
      console.error("Error while booking packages", error);
      return res.status(500).json({
        message: "Server error, unable to book package",
        success: false,
        error: error.message,
      });
    }
  };
  

  export const getAllTour = async (req, res) => {
    try {
      const tours = await Package.find();
  
      if (!tours || tours.length === 0) {
        return res.status(404).json({ message: "No tours found" });
      }
  
      res.status(200).json({
        success: true,
        count: tours.length,
        data: tours,
      });
    } catch (error) {
      console.error("Error fetching tours:", error);
      res.status(500).json({
        success: false,
        message: "Server error, unable to fetch tours",
        error: error.message,
      });
    }
  };

  export const getSpecificTour = async (req, res) => {
    try {
      const { id } = req.params;
  
      const tour = await Tour.findById(id);
  
      if (!tour) {
        return res.status(404).json({
          success: false,
          message: "Tour package not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: tour,
      });
    } catch (error) {
      console.error("Error fetching tour details", error);
      return res.status(500).json({
        message: "Server error, unable to fetch tour details",
        error: error.message,
        success: false,
      });
    }
  };


  
  export const getMyPackages = async (req, res) => {
    try {
      const { userId } = req.params;
 
    
      const bookings = await Booking.find({ userId }).populate("packageId");
 
      if (!bookings || bookings.length === 0) {
        return res.status(200).json({
          message: "No bookings found for this user",
          success: false,
          packages: [], 
        });
      }
 
     
      const packages = bookings.map((booking) => booking.packageId);
 
      return res.status(200).json({
        message: "Booked packages fetched successfully",
        success: true,
        packages,
      });
    } catch (error) {
      console.error("Error fetching the details", error);
      return res.status(500).json({
        message: "Server error, unable to fetch details",
        error: error.message,
        success: false,
      });
    }
 };