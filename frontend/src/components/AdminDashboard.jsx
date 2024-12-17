import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import AdminService from '../services/AdminService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
    image: ''
  });
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await AdminService.getAllPackages();
      setPackages(response.data);
    } catch (error) {
      toast.error('Failed to fetch packages');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      await AdminService.addPackage(newPackage);
      toast.success('Package added successfully');
      fetchPackages();
      setNewPackage({
        title: '',
        description: '',
        price: '',
        availableDates: '',
        image: ''
      });
    } catch (error) {
      toast.error('Failed to add package');
    }
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    try {
      await AdminService.updatePackage(editingPackage._id, editingPackage);
      toast.success('Package updated successfully');
      fetchPackages();
      setEditingPackage(null);
    } catch (error) {
      toast.error('Failed to update package');
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await AdminService.deletePackage(id);
      toast.success('Package deleted successfully');
      fetchPackages();
    } catch (error) {
      toast.error('Failed to delete package');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Package Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingPackage ? 'Edit Package' : 'Add New Package'}
          </h2>
          <form onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Package Title"
                value={editingPackage ? editingPackage.title : newPackage.title}
                onChange={editingPackage 
                  ? (e) => setEditingPackage({...editingPackage, title: e.target.value}) 
                  : handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {/* Add similar input fields for description, price, dates, image */}
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <Plus className="mr-2" /> {editingPackage ? 'Update' : 'Add'} Package
            </button>
          </form>
        </div>

        {/* Packages List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Existing Packages</h2>
          {packages.map((pkg) => (
            <div key={pkg._id} className="flex items-center justify-between mb-4 p-3 border rounded-md">
              <div>
                <h3 className="font-medium">{pkg.title}</h3>
                <p className="text-sm text-gray-500">${pkg.price}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setEditingPackage(pkg)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => handleDeletePackage(pkg._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;