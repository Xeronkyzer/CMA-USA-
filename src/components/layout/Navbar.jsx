'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          US CMA Prep
        </Link>

        {/* Hamburger Icon */}
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
        </button>

        <div className={`${styles.links} ${isMenuOpen ? styles.active : ''}`}>
          <Link href="/syllabus" className={styles.link} onClick={() => setIsMenuOpen(false)}>Syllabus</Link>
          <Link href="/study-plan" className={styles.link} onClick={() => setIsMenuOpen(false)}>Study Plan</Link>
          <Link href="/mock-test" className={styles.link} onClick={() => setIsMenuOpen(false)}>Mock Tests</Link>
        </div>
      </div>
    </nav>
  );
}
