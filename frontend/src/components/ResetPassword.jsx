import { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Enlace para restablecer la contraseña enviado!');
      } else {
        setMessage(data.message || 'Ocurrió un error');
      }
    } catch (error) {
      setMessage('No se pudo conectar con el servidor');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Restablecer Contraseña
            </button>
          </div>
        </form>
        {message && <div style={styles.message}>{message}</div>}
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
    width: '100%',
    padding: '0.8rem',
    fontSize: '0.95rem',
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
  message: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#ff87b7',
  },
};

export default ResetPassword;
