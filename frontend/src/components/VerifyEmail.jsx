import { useState } from 'react';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification email sent!');
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Verificar Correo Electrónico</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <label htmlFor="code" style={styles.label}>Código de Verificación</label>
            <input
              type="text"
              id="code"
              placeholder="Ingresa el código de verificación"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Verificar Correo
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
    width: '95%',
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
    color: '#ff6b6b',
  },
};

export default VerifyEmail;
