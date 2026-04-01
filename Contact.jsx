import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', text: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/messages', formData)
      .then(() => {
        setStatus("✅ Message sent! / संदेश भेज दिया गया है!");
        setFormData({ name: '', email: '', text: '' });
      })
      .catch(() => setStatus("❌ Server Error"));
  };

  return (
    <div style={styles.container}>
      <div className="glass-card" style={styles.card}>
        <h2 style={styles.title}>Contact Admin</h2>
        <p style={styles.subtitle}>Feedback for Kamgaar Connect</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            className="pill-input" 
            placeholder="ENTER YOUR NAME" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            className="pill-input" 
            type="email" 
            placeholder="ENTER EMAIL" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <textarea 
            className="pill-input" 
            placeholder="WRITE MESSAGE HERE..." 
            style={{height: '120px', borderRadius: '25px', resize: 'none'}}
            value={formData.text} 
            onChange={e => setFormData({...formData, text: e.target.value})} 
            required 
          />
          <button type="submit" style={styles.btn}>SEND MESSAGE</button>
        </form>
        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: { height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { padding: '40px', width: '100%', maxWidth: '450px', textAlign: 'center' },
  title: { color: '#1e293b', fontWeight: '800', marginBottom: '5px' },
  subtitle: { color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  btn: { backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '16px', borderRadius: '50px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' },
  status: { marginTop: '15px', fontWeight: '600', color: '#0ea5e9' }
};

export default Contact;