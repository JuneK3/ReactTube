import React from 'react';
import { withRouter } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';

function LandingPage({ history }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}>
      <FaCode style={{ fontSize: '4rem', marginRight: '1rem' }} />
      <span style={{ fontSize: '2rem' }}>BoilerPlate Main Page</span>
    </div>
  );
}

export default withRouter(LandingPage);
