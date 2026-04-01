import React from 'react';

function About() {
  return (
    <div style={styles.screen}>
      <div className="glass-card" style={styles.card}>
        <h1 style={styles.title}>About Kamgaar Connect</h1>
        <p style={styles.subtitle}>Empowering Bhopal's Daily-Wage Workforce</p>
        
        <div style={styles.section}>
          <h4 style={styles.h4}>Our Vision</h4>
          <p style={styles.p}>A digital bridge for Bhopal. We eliminate middlemen, allowing workers to post skills and customers to find help directly.</p>
          <p style={styles.hindi}>मेहनत आपकी, मंच हमारा। बिना किसी बिचौलिए के।</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.h4}>Why Us?</h4>
          <ul style={styles.list}>
            <li>📍 Live GPS Tracking</li>
            <li>💼 Zero Commission</li>
            <li>🛡️ Verified Local Workers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  screen: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' },
  card: { maxWidth: '600px', width: '100%', textAlign: 'center' },
  title: { color: '#1e293b', fontWeight: '800', fontSize: '2rem' },
  subtitle: { color: '#64748b', marginBottom: '30px', fontWeight: '600' },
  section: { textAlign: 'left', marginTop: '20px' },
  h4: { color: '#1e293b', fontWeight: '800', marginBottom: '10px' },
  p: { color: '#475569', lineHeight: '1.6' },
  hindi: { color: '#0ea5e9', fontWeight: '700', marginTop: '10px' },
  list: { listStyle: 'none', padding: 0, color: '#475569', lineHeight: '2' }
};

export default About;