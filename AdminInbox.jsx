import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminInbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages').then(res => setMessages(res.data));
  }, []);

  return (
    <div className="glass-card" style={{padding: '40px'}}>
      <h2 style={{color: '#1e293b', borderBottom: '2px solid #0ea5e9', display: 'inline-block', paddingBottom: '5px'}}>
        Secret Inbox ({messages.length})
      </h2>
      <div style={{marginTop: '30px'}}>
        {messages.map(m => (
          <div key={m._id} style={styles.msgCard}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h4 style={{margin: '0', color: '#0ea5e9'}}>{m.name}</h4>
              <span style={{fontSize: '0.7rem', color: '#94a3b8'}}>{new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={{fontSize: '0.8rem', color: '#64748b', margin: '5px 0'}}>{m.email}</p>
            <p style={{color: '#1e293b', marginTop: '10px', lineHeight: '1.5'}}>{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  msgCard: { background: '#f8fafc', padding: '20px', borderRadius: '20px', marginBottom: '15px', border: '1px solid #e2e8f0' }
};

export default AdminInbox;