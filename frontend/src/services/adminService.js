import axios from 'axios';

const BASE_URL = '/api/admin'; // Adjust based on your backend setup

class AdminService {
  static async addPackage(packageData) {
    return axios.post(`${BASE_URL}/addPackage`, packageData);
  }

  static async updatePackage(id, packageData) {
    return axios.put(`${BASE_URL}/updatePackage/${id}`, packageData);
  }

  static async deletePackage(id) {
    return axios.delete(`${BASE_URL}/packages/${id}`);
  }

  static async getAllPackages() {
    // You'll need to add a corresponding backend route for this
    return axios.get('/api/packages');
  }
}

export default AdminService;