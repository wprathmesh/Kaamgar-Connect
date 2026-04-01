import React from 'react';

function Creator() {
  return (
    <div style={styles.screen}>
      <div className="glass-card" style={styles.card}>
        <div style={styles.avatar}>P</div>
        <h1 style={styles.name}>Prathmesh</h1>
        <p style={styles.role}>Lead Developer & Visionary</p>
        
        <div style={styles.badgeContainer}>
          <span style={styles.badge}>React.js</span>
          <span style={styles.badge}>Node.js</span>
          <span style={styles.badge}>Bhopal Tech</span>
        </div>

        <p style={styles.bio}>
          Building digital solutions to solve real-world problems. 
          Kamgaar Connect is my mission to empower Bhopal's local workforce.
        </p>

        <a href="https://www.youtube.com/@theKrishnaversetoday" target="_blank" className="main-btn" style={{textDecoration: 'none', display: 'block', textAlign:'center'}}>
          VISIT MY CHANNEL
        </a>
      </div>
    </div>
  );
}

const styles = {
  screen: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' },
  card: { maxWidth: '450px', textAlign: 'center' },
  avatar: { width: '80px', height: '80px', background: '#1e293b', color: '#fff', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '800' },
  name: { fontSize: '2.2rem', color: '#1e293b', fontWeight: '800' },
  role: { color: '#64748b', fontWeight: '600', marginBottom: '20px' },
  badgeContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' },
  badge: { background: '#e2e8f0', color: '#1e293b', padding: '8px 15px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700' },
  bio: { color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '30px' }
};

export default Creator;