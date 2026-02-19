'use client';

import { useState } from 'react';
import QuizSection from './QuizSection';
import styles from './TestSection.module.css';

export default function TestSection({ questions }) {
    const [showTest, setShowTest] = useState(false);

    if (!questions || questions.length === 0) return null;

    if (!showTest) {
        return (
            <div className={styles.startTestSection}>
                <h2>Topic Completion Test</h2>
                <p>
                    Challenge yourself with this comprehensive <strong>{questions.length}-question</strong> test.
                    <br />
                    Answering these correctly indicates mastery of the topic.
                </p>
                <button
                    className={`btn ${styles.startBtn}`}
                    onClick={() => setShowTest(true)}
                >
                    Start Completion Test
                </button>
            </div>
        );
    }

    return (
        <section>
            <div className={styles.testHeader}>
                <h2>Completion Test</h2>
                <button
                    className={`btn btn-outline ${styles.closeBtn}`}
                    onClick={() => setShowTest(false)}
                >
                    Close Test
                </button>
            </div>
            <QuizSection questions={questions} />
        </section>
    );
}
