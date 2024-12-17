import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/authContext";
import { Mountain } from "lucide-react";

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated && <Navbar onLogout={logout} />}
      
      <main className="flex-grow container mx-auto px- py-8">
        <Outlet />
      </main>
      
      <footer className=" py-6  border-t">
        <div className="container mx-auto flex-col justify-center items-center ">
          <div className="flex items-center bg-white justify-center ">
            <Mountain className="text-blue-600" size={24} />
            <span className="font-bold text-gray-800">WanderWise</span>
          </div>
          <p className="text-gray-600 mt-2 text-center">
            © {new Date().getFullYear()} WanderWise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}