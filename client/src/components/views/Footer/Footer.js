import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        borderTop: 'solid 1px #e8e8e8',
      }}>
      <p>
        Footer Part <CopyrightOutlined /> Junek3
      </p>
    </div>
  );
}

export default Footer;
