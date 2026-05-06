'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo" onClick={closeMenu}>
          📦 <span>Inventory</span> System
        </Link>
        
        {/* Hamburger Menu Button - visible only on mobile */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className="hamburger-icon">☰</span>
        </button>
        
        {/* Navigation Links - conditionally visible on mobile */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className="nav-link" onClick={closeMenu}>Dashboard</Link>
          <Link href="/products" className="nav-link" onClick={closeMenu}>Products</Link>
          <Link href="/products/new" className="nav-link" onClick={closeMenu}>Add Product</Link>
          <Link href="/suppliers" className="nav-link" onClick={closeMenu}>Suppliers</Link>
          <Link href="/stock" className="nav-link" onClick={closeMenu}>Stock Movements</Link>
        </div>
      </div>
    </nav>
  );
}