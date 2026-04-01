import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home({ role }) {
  const [workers, setWorkers] = useState([]);
  const [workerTab, setWorkerTab] = useState('broadcast'); 
  const [formData, setFormData] = useState({ title: '', locationName: '', wage: '', phone: '' });
  const [userCoords, setUserCoords] = useState(null);

  // 1. Mock Data for Organization Jobs (For Workers to find)
  const orgJobs = [
    { id: 1, company: "Bhopal Construction Co.", role: "Mason / Painter", wage: "₹600/day", location: "Kolar Road", contact: "919000000000" },
    { id: 2, company: "DB Mall Maintenance", role: "Cleaning Staff", wage: "₹12000/month", location: "MP Nagar", contact: "919000000001" }
  ];

  // 2. Fetch workers near the user
  const fetchWorkers = (coords) => {
    const url = coords 
      ? `http://localhost:5000/api/jobs?lat=${coords.lat}&lng=${coords.lng}`
      : 'http://localhost:5000/api/jobs';
    
    axios.get(url)
      .then(res => setWorkers(res.data))
      .catch(() => {
        setWorkers([
          { _id: '1', title: 'Carpenter', locationName: 'MP Nagar', wage: '₹530/day', phone: '9100000000' },
          { _id: '2', title: 'Electrician', locationName: 'Indrapuri', wage: '₹500/day', phone: '9100000001' }
        ]);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(coords);
        fetchWorkers(coords);
      });
    } else {
      fetchWorkers();
    }
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) return alert("Phone must be 10 digits.");
    const data = { ...formData, lat: userCoords?.lat, lng: userCoords?.lng };
    axios.post('http://localhost:5000/api/jobs', data).then(() => {
      alert("Broadcast Live!");
      setFormData({ title: '', locationName: '', wage: '', phone: '' });
      fetchWorkers(userCoords);
    });
  };

  const handleApply = (job) => {
    const msg = `Hello ${job.company}, I'm interested in the ${job.role} job in ${job.location} via Kamgaar Connect.`;
    window.open(`https://wa.me/${job.contact}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <p style={styles.roleText}>MODE: {role?.toUpperCase()}</p>
        <h1 style={styles.pageTitle}>
          {role === 'worker' ? "Worker Dashboard" : role === 'org' ? "Organization Portal" : "Nearby Workers"}
        </h1>
      </header>

      <div className="glass-card" style={styles.cardWrapper}>
        
        {/* --- 👷 WORKER VIEW --- */}
        {role === 'worker' && (
          <>
            <div style={styles.tabContainer}>
              <button onClick={() => setWorkerTab('broadcast')} style={workerTab === 'broadcast' ? styles.activeTab : styles.inactiveTab}>Broadcast</button>
              <button onClick={() => setWorkerTab('jobs')} style={workerTab === 'jobs' ? styles.activeTab : styles.inactiveTab}>Find Jobs</button>
            </div>

            {workerTab === 'broadcast' ? (
              <form onSubmit={handlePost} style={styles.form}>
                <input className="pill-input" placeholder="Skill" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                <input className="pill-input" placeholder="Area" value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})} required />
                <input className="pill-input" placeholder="Wage" value={formData.wage} onChange={e => setFormData({...formData, wage: e.target.value})} required />
                <div style={{position: 'relative'}}>
                  <input className="pill-input" type="tel" placeholder="10-Digit Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})} required style={{width: '100%', color: '#1e293b'}} />
                  <span style={styles.charCount}>{formData.phone.length}/10</span>
                </div>
                <button type="submit" className="main-btn" style={{marginTop: '10px'}}>GO LIVE</button>
              </form>
            ) : (
              <div style={styles.list}>
                <p style={styles.tabSubtitle}>Available Projects</p>
                {orgJobs.map(job => (
                  <div key={job.id} style={styles.jobCard}>
                    <div style={styles.cardHeader}>
                      <h4 style={styles.workerTitle}>{job.role}</h4>
                      <span style={styles.wageBadge}>{job.wage}</span>
                    </div>
                    <p style={styles.workerSub}>🏢 <b>{job.company}</b> • 📍 {job.location}</p>
                    <button style={styles.inviteBtn} onClick={() => handleApply(job)}>Apply on WhatsApp</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* --- 💼 CUSTOMER & 🏢 ORG VIEW --- */}
        {(role === 'employer' || role === 'org') && (
          <div style={styles.list}>
            {workers.map(w => (
              <div key={w._id} style={styles.jobCard}>
                <div style={styles.cardHeader}>
                  <h4 style={styles.workerTitle}>{w.title}</h4>
                  <span style={styles.distanceBadge}>📍 5km Range</span>
                </div>
                <p style={styles.workerSub}>👤 Worker • 📍 {w.locationName} • <b>{w.wage}</b></p>
                <div style={styles.btnGroup}>
                  <a href={`tel:${w.phone}`} style={styles.callBtn}>📞 Call</a>
                  {role === 'org' && <button style={styles.inviteBtn} onClick={() => window.open(`https://wa.me/91${w.phone}?text=Hiring!`)}>Invite</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', minHeight: '100vh' },
  header: { textAlign: 'center', marginBottom: '30px' },
  roleText: { color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', margin: 0 },
  pageTitle: { color: '#fff', fontSize: '2.2rem', fontWeight: '900', margin: '5px 0 0 0' },
  cardWrapper: { width: '100%', maxWidth: '450px', background: '#fff', borderRadius: '35px', padding: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' },
  tabContainer: { display: 'flex', background: '#f1f5f9', borderRadius: '50px', padding: '5px', marginBottom: '25px' },
  activeTab: { flex: 1, padding: '12px', background: '#1e293b', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: 'bold' },
  inactiveTab: { flex: 1, padding: '12px', background: 'transparent', color: '#64748b', border: 'none', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  charCount: { position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  tabSubtitle: { color: '#1e293b', fontSize: '0.8rem', fontWeight: '900', textAlign: 'center', marginBottom: '10px' },
  jobCard: { background: '#f8fafc', padding: '20px', borderRadius: '25px', border: '1px solid #e2e8f0' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' },
  workerTitle: { color: '#1e293b', margin: 0, fontSize: '1.1rem', fontWeight: '800' },
  wageBadge: { background: '#f0fdf4', color: '#166534', padding: '4px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 'bold' },
  distanceBadge: { background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 'bold' },
  workerSub: { color: '#64748b', fontSize: '0.85rem', margin: '0 0 15px 0', fontWeight: '600' },
  btnGroup: { display: 'flex', gap: '10px' },
  callBtn: { flex: 1, background: '#1e293b', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' },
  inviteBtn: { flex: 2, background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: '800', fontSize: '0.85rem' }
};

export default Home;