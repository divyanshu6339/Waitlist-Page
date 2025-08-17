import React, { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);

  return (
    <div style={{ background: '#222', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <button onClick={() => setShow(true)} style={{ background: 'blue', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
        Join Waitlist
      </button>

      <div style={{ textAlign: 'center', margin: '50px 0' }}>
        <h1>New Product Coming</h1>
        <p style={{ fontSize: '20px' }}>Amazing thing launching soon</p>
        <button onClick={() => setShow(true)} style={{ background: 'blue', color: 'white', padding: '15px', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
          Join Waitlist
        </button>
      </div>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h2>Problems</h2>
        <p>❌ Manual work</p>
        <p>❌ Old tools</p>
        <p>❌ Bad data</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <div style={{ background: '#333', padding: '20px', textAlign: 'center', borderRadius: '10px', border: '2px solid #444', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
          <h3 style={{ color: 'red' }}>75%</h3>
          <p>Lost Money</p>
        </div>
        <div style={{ background: '#333', padding: '20px', textAlign: 'center', borderRadius: '10px', border: '2px solid #444', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
          <h3 style={{ color: 'orange' }}>25%</h3>
          <p>Less Sales</p>
        </div>
        <div style={{ background: '#333', padding: '20px', textAlign: 'center', borderRadius: '10px', border: '2px solid #444', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
          <h3 style={{ color: 'yellow' }}>50%</h3>
          <p>Less Value</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <div style={{ border: '2px solid blue', padding: '30px', borderRadius: '15px', boxShadow: '0 6px 20px rgba(0,100,255,0.3)', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', maxWidth: '400px', margin: '0 auto' }}>
          <h2>Ready?</h2>
          <button onClick={() => setShow(true)} style={{ background: 'blue', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            Join Now
          </button>
        </div>
      </div>

      {show && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#333', padding: '20px', width: '300px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>
            <button onClick={() => setShow(false)} style={{ float: 'right', background: 'none', border: 'none', color: 'white' }}>×</button>
            
            {step === 1 && (
              <div>
                <h3>Email</h3>
                <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', background: '#555', border: 'none', color: 'white' }} />
                <button onClick={() => { if(email) setStep(2); }} style={{ width: '100%', background: 'blue', color: 'white', padding: '10px', border: 'none', marginTop: '10px' }}>Send</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3>Code</h3>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" style={{ width: '100%', padding: '10px', background: '#555', border: 'none', color: 'white' }} />
                <button onClick={() => { if(code === '123456') setStep(3); }} style={{ width: '100%', background: 'blue', color: 'white', padding: '10px', border: 'none', marginTop: '10px' }}>Check</button>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center' }}>
                <h3>Success!</h3>
                <div style={{ background: '#555', padding: '10px' }}>
                  <div style={{ filter: 'blur(1px)' }}>#42</div>
                  <p>Check email 😉</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;