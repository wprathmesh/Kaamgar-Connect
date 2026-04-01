import React, { useState } from 'react';

function Login({ onLogin }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');

  const handleMockGoogleLogin = () => onLogin('org');

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpInput === '1234') onLogin(role);
    else alert("Invalid OTP! Try '1234'");
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length === 10) setStep(3);
    else alert("Please enter exactly 10 digits.");
  };

  return (
    <div style={styles.overlay}>
      <div className="glass-card" style={styles.loginCard}>
        
        <div style={styles.brandContainer}>
          <h1 style={styles.brandName}>👷 Kamgaar Connect</h1>
          {role && <span style={styles.roleBadge}>{role.toUpperCase()} MODE</span>}
        </div>

        {step === 1 && (
          <div style={styles.content}>
            <h2 style={styles.headerTitle}>CHOOSE YOUR ROLE</h2>
            <button onClick={() => {setRole('worker'); setStep(2)}} style={styles.roleBtn}>👷 WORKER</button>
            <button onClick={() => {setRole('employer'); setStep(2)}} style={styles.roleBtn}>💼 CUSTOMER</button>
            <div style={styles.divider}><div style={styles.line}></div><span style={{padding:'0 10px'}}>OR</span><div style={styles.line}></div></div>
            <p style={styles.orgText}>Are you an Organization?</p>
            <button onClick={handleMockGoogleLogin} style={styles.mockGoogleBtn}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Reference_Icon.png" alt="G" style={{width:'18px', marginRight:'10px'}} />
              Continue with Gmail
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSendOTP} style={styles.content}>
            <h2 style={styles.headerTitle}>MOBILE LOGIN</h2>
            <div style={styles.inputWrapper}>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                required 
                style={styles.pillInputFixed}
              />
              <span style={styles.counter}>{phone.length}/10</span>
            </div>
            <button type="submit" className="main-btn" style={styles.mainBtnFixed}>GET OTP</button>
            <button type="button" onClick={() => setStep(1)} style={styles.backBtn}>← Change Role</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleVerifyOTP} style={styles.content}>
            <h2 style={styles.headerTitle}>VERIFY OTP</h2>
            <div style={styles.inputWrapper}>
              <input 
                type="number" 
                placeholder="OTP (1234)" 
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.slice(0, 4))} 
                required 
                style={styles.pillInputFixed}
              />
            </div>
            <button type="submit" className="main-btn" style={styles.mainBtnFixed}>VERIFY & LOGIN</button>
            <button type="button" onClick={() => setStep(2)} style={styles.backBtn}>← Edit Number</button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', zIndex: 1000 },
  loginCard: { width: '90%', maxWidth: '400px', padding: '40px', background: '#ffffff', borderRadius: '35px', textAlign: 'center' },
  brandContainer: { marginBottom: '25px' },
  brandName: { fontSize: '1.7rem', fontWeight: '800', color: '#1e293b', margin: 0 },
  roleBadge: { background: '#f1f5f9', color: '#1e293b', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '800', marginTop: '8px', display: 'inline-block' },
  headerTitle: { color: '#1e293b', fontWeight: '800', fontSize: '1rem', marginBottom: '20px', letterSpacing: '0.5px' },
  content: { display: 'flex', flexDirection: 'column', gap: '15px' },
  
  inputWrapper: { position: 'relative', width: '100%' },
  pillInputFixed: {
    width: '100%',
    padding: '16px 25px',
    borderRadius: '50px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b', // Force dark text
    outline: 'none',
    boxSizing: 'border-box'
  },
  counter: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' },
  
  mainBtnFixed: { width: '100%', background: '#1e293b', color: '#fff', padding: '16px', borderRadius: '50px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '1rem' },
  roleBtn: { padding: '16px', borderRadius: '50px', border: '2px solid #e2e8f0', background: '#fff', color: '#1e293b', fontWeight: '700', cursor: 'pointer' },
  divider: { margin: '10px 0', display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '0.7rem' },
  line: { flex: 1, height: '1px', background: '#e2e8f0' },
  orgText: { fontSize: '0.85rem', color: '#64748b', fontWeight: '600' },
  mockGoogleBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', borderRadius: '50px', border: '1px solid #dadce0', background: '#fff', color: '#3c4043', fontWeight: '600', cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem', marginTop: '5px', fontWeight: '600' }
};

export default Login;