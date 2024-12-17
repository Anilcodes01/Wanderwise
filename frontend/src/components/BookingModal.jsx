import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { X, Check } from "lucide-react";
import { packageService } from "../services/packageService";
import { authService } from "../services/authService";

export default function BookingModal({ isOpen, onClose, packageDetails }) {
  const [formData, setFormData] = useState({
    userId: "",
    customerName: "",
    email: "",
    phoneNumber: "",
    numberOfTravelers: 1,
    specialRequests: "",
    packageId: packageDetails?._id,
    totalPrice: packageDetails?.price || 0,
  });
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numberOfTravelers") {
      const travelers = parseInt(value) || 1;
      setFormData((prev) => ({
        ...prev,
        [name]: travelers,
        totalPrice: packageDetails.price * travelers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const generateInvoice = (bookingData) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Booking Invoice", 105, 20, { align: "center" });

    // Booking Details
    doc.setFontSize(12);
    doc.text(`Customer Name: ${bookingData.customerName}`, 20, 40);
    doc.text(`Email: ${bookingData.email}`, 20, 50);
    doc.text(`Phone Number: ${bookingData.phoneNumber}`, 20, 60);
    doc.text(`Number of Travelers: ${bookingData.numberOfTravelers}`, 20, 70);
    doc.text(`Special Requests: ${bookingData.specialRequests || "None"}`, 20, 80);

    // Package Details
    doc.text(`Package Name: ${packageDetails.title}`, 20, 100);
    doc.text(`Package Price: Rs. ${packageDetails.price}`, 20, 110);
    doc.text(`Total Price: Rs. ${bookingData.totalPrice.toLocaleString()}`, 20, 120);

    // Footer
    doc.text("Thank you for booking with us!", 105, 140, { align: "center" });

    // Save the PDF
    doc.save("booking-invoice.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBookingStatus({ success: false, message: "" });

    try {
      const currentUser = await authService.getCurrentUser();
      const submissionData = {
        ...formData,
        userId: currentUser._id,
        customerName: formData.customerName || currentUser?.name || "Anonymous",
      };

      const response = await packageService.bookPackage(submissionData);

      setBookingStatus({
        success: true,
        message: response.message || "Booking successful!",
      });

      // Generate Invoice
      generateInvoice(submissionData);

      setTimeout(() => {
        onClose();
        setFormData({
          customerName: "",
          email: "",
          phoneNumber: "",
          numberOfTravelers: 1,
          specialRequests: "",
          packageId: packageDetails?._id,
          totalPrice: packageDetails?.price || 0,
        });
      }, 2000);
    } catch (error) {
      setBookingStatus({
        success: false,
        message: error || "Booking failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="p-6 pb-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Book {packageDetails.title}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Complete your booking details
          </p>
        </div>

        {bookingStatus.message && (
          <div
            className={`mx-6 mt-4 p-3 rounded-lg flex items-center ${
              bookingStatus.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {bookingStatus.success ? <Check className="mr-2" /> : null}
            {bookingStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
          {/* Input Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1 (123) 456-7890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Travelers
            </label>
            <input
              type="number"
              name="numberOfTravelers"
              min="1"
              max="10"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special requirements?"
            />
          </div>

          <div className="bg-gray-100 rounded-md p-4 flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Price</span>
            <span className="text-blue-600 font-bold text-xl">
              Rs. {formData.totalPrice.toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg transition-colors font-semibold ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
