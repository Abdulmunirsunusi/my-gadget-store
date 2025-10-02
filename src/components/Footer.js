import React from 'react';
export default function Footer(){
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Gadget Store</div>
      <div>Built with React • Plain CSS</div>
    </footer>
  );
}