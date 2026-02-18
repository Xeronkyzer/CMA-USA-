import Link from 'next/link';
import examsData from '@/data/exams.json';
import styles from './page.module.css';

export default function MockTestDashboard() {
    return (
        <div className={`container ${styles.container}`}>
            <header className={styles.header}>
                <h1>Mock Exam Simulator</h1>
                <p>Experience the real exam pressure. Timed environment with instant scoring.</p>
            </header>

            <div className={styles.examGrid}>
                {examsData.exams.map((exam) => (
                    <div key={exam.id} className={styles.examCard}>
                        <div className={styles.cardHeader}>
                            <h3>{exam.title}</h3>
                            <span className={styles.duration}>{exam.duration} Mins</span>
                        </div>
                        <p>{exam.description}</p>
                        <div className={styles.meta}>
                            <span>{exam.questionCount} Questions</span>
                            <span>Multiple Choice</span>
                        </div>
                        <Link href={`/mock-test/${exam.id}`} className="btn">
                            Start Exam
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
