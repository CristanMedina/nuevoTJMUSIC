import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useAuthStore } from "./store/authStore";

import Navbar from "./components/Navbar";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import LandingPage from "./pages/LandingPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/ingreso" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verificar-correo" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-rose-900 to-red-900 flex items-center justify-center relative overflow-hidden">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
            path="/registro"
            element={
                <RedirectAuthenticatedUser>
                <RegisterPage />
                </RedirectAuthenticatedUser>
            }
            />
            <Route
            path="/ingreso"
            element={
                <RedirectAuthenticatedUser>
                <LoginPage />
                </RedirectAuthenticatedUser>
            }
            />
            <Route path="/verificar-correo" element={<EmailVerificationPage />} />
        </Routes>
        </div>
    </>
  );
}

export default App;
