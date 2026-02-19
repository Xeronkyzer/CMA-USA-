'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show if scrolling up or at the very top
      // Hide if scrolling down more than 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          US CMA Prep
        </Link>

        <div className={styles.rightGroup}>
          <ThemeToggle />
          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
            <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
            <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
          </button>
        </div>

        <div className={`${styles.links} ${isMenuOpen ? styles.active : ''}`}>
          <Link href="/syllabus" className={styles.link} onClick={() => setIsMenuOpen(false)}>Syllabus</Link>
          <Link href="/study-plan" className={styles.link} onClick={() => setIsMenuOpen(false)}>Study Plan</Link>
          <Link href="/formulas" className={styles.link} onClick={() => setIsMenuOpen(false)}>Formulas</Link>
          <Link href="/mnemonics" className={styles.link} onClick={() => setIsMenuOpen(false)}>Mnemonics</Link>
          <Link href="/mock-test" className={styles.link} onClick={() => setIsMenuOpen(false)}>Mock Tests</Link>
          <Link href="/about" className={styles.link} onClick={() => setIsMenuOpen(false)}>About</Link>
        </div>
      </div>
    </nav>
  );
}
