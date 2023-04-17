import React from 'react';
import './Header.css'; // Import your CSS file for styling

export default function Header() {
  return (
    <div className="front-page-container">
      <h1 className="front-page-title">Cloud-based Music Source Separation</h1>
      <p className="front-page-content">Upload an MP3 file below and wait for several minutes for the seperated sound tracks.</p>
    </div>
  );
}
