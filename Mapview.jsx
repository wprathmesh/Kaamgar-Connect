import React from 'react';

function MapView() {
  return (
    <div style={styles.wrapper}>
      <div className="glass-card" style={styles.card}>
        <h2 style={styles.title}>Bhopal Live Map</h2>
        
        <div style={styles.mapContainer}>
          {/* Your map goes here */}
          <p style={{ color: '#94a3b8' }}>Map Feed Loading...</p>
        </div>
        
        <div style={styles.legend}>
          <span style={styles.legendItem}>
            <span style={styles.dotWorker}></span> Worker
          </span>
          <span style={styles.legendItem}>
            <span style={styles.dotUser}></span> You
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center', /* Centers horizontally */
    alignItems: 'center', /* Centers vertically */
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  card: {
    width: '100%',
    maxWidth: '1000px',
    height: '650px',
    margin: '0 auto', /* Force block centering as a backup */
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: '20px',
    fontWeight: '800'
  },
  mapContainer: {
    flex: 1,
    background: '#f1f5f9',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #cbd5e1'
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 'bold',
    color: '#1e293b',
    fontSize: '0.9rem'
  },
  dotWorker: { width: '12px', height: '12px', background: '#1e293b', borderRadius: '50%' },
  dotUser: { width: '12px', height: '12px', background: '#0ea5e9', borderRadius: '50%' }
};

export default MapView;