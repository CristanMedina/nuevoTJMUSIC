import { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Crea tu Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <label htmlFor="username" style={styles.label}>Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirma tu contraseña"
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Registrarse
            </button>
          </div>
        </form>

        {responseMessage && <div style={styles.message}>{responseMessage}</div>}
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                 url('https://wallpapers.com/images/hd/metallica-1983-logo-hd-i2d54he54c2asg7b.jpg') no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    padding: 0,
    color: '#f5f5f5',
  },
  container: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#ff87b7',
  },
  inputContainer: {
    marginBottom: '1.2rem',
    textAlign: 'left',  
  },
  label: {
    fontSize: '1rem',
    color: '#fff',
    marginBottom: '0.5rem',
    display: 'block',  
  },
  input: {
    width: '94%',
    padding: '0.8rem', // Ajuste del padding para reducir el tamaño
    fontSize: '0.95rem', // Ajuste del tamaño de la fuente para mayor control
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#333',
    color: '#fff',
    marginBottom: '1rem',
    outline: 'none',
    transition: '0.3s',
  },
  buttonContainer: {
    marginTop: '1rem',
  },
  button: {
    backgroundColor: '#ff87b7',
    color: '#121212',
    border: 'none',
    padding: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '1rem',
  },
  buttonHover: {
    backgroundColor: '#ff629e',
  },
  message: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#ff87b7',
  },
};

export default SignUp;
