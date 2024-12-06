import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("You have successfully logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-xl font-bold text-rose-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          TJ MUSIC
        </h1>

        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Welcome, <strong>{user?.name || "User"}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/ingreso")}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
            >
              Ingresar
            </button>
            <button
              onClick={() => navigate("/registro")}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg"
            >
              Crear cuenta
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
