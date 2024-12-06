import { Lock, Mail, Loader } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleIngreso = async (e) => {
    e.preventDefault();

    try {
      await login(email,password);
      navigate("/");
      toast.success("Cuenta ingresada con exito")
    } catch (error) {
      toast.error(error.response.data.message || "Error durante el Ingreso de cuenta");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-400 to-red-600 text-transparent bg-clip-text">
          Ingresar Usuario
        </h2>
        <form onSubmit={handleIngreso}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center font-bold font-mono text-sm text-fuchsia-500">
            {error}
          </p>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          No tienes cuenta?{" "}
          <Link to={"/registro"} className="text-red-500 hover:underline">
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
