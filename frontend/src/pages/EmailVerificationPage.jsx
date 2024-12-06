import { useRef, useState } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { verifyEmail, error, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const verificationCode = code.join('');
      try {
        await verifyEmail(verificationCode);
        navigate("/");
        toast.success("Correo verificado con éxito");
      } catch (error) {
        toast.error(error.response.data.message || "Error durante la verificación");
        console.log(error);
      }
    }

    const handleChange = (index, value) => {
      const newCode = [...code];

      if (value.length > 1) {
        const pastedCode = value.slice(0, 6).split('');
        for (let i = 0; i < 6; i++) {
          newCode[i] = pastedCode[i] || '';
        }
        setCode(newCode);

        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();

      } else {
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }
    };

    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };

    useEffect(() => {
      if (code.every(digit => digit !== '')) {
        handleSubmit(new Event('submit'));
      }
    }, [code]);

  return (
    <div>
      <div className="max-w-md w-full bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-400 to-red-600 text-transparent bg-clip-text">
            Verifica tu Correo
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Ingresa el código de 6 dígitos que enviamos al correo proporcionado
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold text-black bg-gray-100 rounded-lg border border-gray-500 focus:border-rose-500"
                />
              ))}
            </div>
            <button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Verificar"}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center font-bold font-mono text-sm text-fuchsia-500">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
