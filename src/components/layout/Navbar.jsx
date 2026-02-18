import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          US CMA Prep
        </Link>
        <div className={styles.links}>
          <Link href="/syllabus" className={styles.link}>Syllabus</Link>
          <Link href="/study-plan" className={styles.link}>Study Plan</Link>
          <Link href="/mock-test" className={styles.link}>Mock Tests</Link>
        </div>
      </div>
    </nav>
  );
}
