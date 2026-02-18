import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: "US CMA Prep | Free Study Guide & Mock Exams",
  description: "Ace your US CMA exam with our free, structured study plan. Access comprehensive notes, topic-wise quizzes, and full-length mock tests.",
  keywords: ["US CMA", "CMA Exam", "Free CMA Prep", "Management Accounting", "CMA Mock Test", "Study Plan"],
};

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>US CMA Preparation <br /> <span className={styles.subtitle}>Structured. Disciplined. Free.</span></h1>
          <p className={styles.description}>
            A complete digital ecosystem for Indian aspirants to crack the US CMA exam without expensive coaching.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/study-plan" className="btn">Start Structured Plan</Link>
            <Link href="/mock-test" className="btn btn-outline">Take Mock Test</Link>
          </div>
        </div>
      </header>

      <section className={`container ${styles.features}`}>
        <div className={styles.featureCard}>
          <h3>Complete Syllabus</h3>
          <p>Detailed notes for every topic in Part 1 & Part 2, structured by weightage.</p>
          <Link href="/syllabus" className={styles.linkArrow}>View Syllabus →</Link>
        </div>
        <div className={styles.featureCard}>
          <h3>Mock Exams</h3>
          <p>Real exam simulation with 3-hour timer and instant scoring for MCQs.</p>
          <Link href="/mock-test" className={styles.linkArrow}>Start Practice →</Link>
        </div>
        <div className={styles.featureCard}>
          <h3>Study Tracker</h3>
          <p>Downloadable 6-month roadmap and progress checklists to stay on track.</p>
          <Link href="/study-plan" className={styles.linkArrow}>View Study Plan →</Link>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className="container">
          <h2>Exam Structure Overview</h2>
          <div className={styles.examGrid}>
            <div className={styles.examPart}>
              <h3>Part 1: Financial Planning, Performance & Analytics</h3>
              <ul>
                <li>External Financial Reporting (15%)</li>
                <li>Planning, Budgeting & Forecasting (20%)</li>
                <li>Performance Management (20%)</li>
                <li>Cost Management (15%)</li>
                <li>Internal Controls (15%)</li>
                <li>Technology & Analytics (15%)</li>
              </ul>
            </div>
            <div className={styles.examPart}>
              <h3>Part 2: Strategic Financial Management</h3>
              <ul>
                <li>Financial Statement Analysis (20%)</li>
                <li>Corporate Finance (20%)</li>
                <li>Decision Analysis (25%)</li>
                <li>Risk Management (10%)</li>
                <li>Investment Decisions (10%)</li>
                <li>Professional Ethics (15%)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
