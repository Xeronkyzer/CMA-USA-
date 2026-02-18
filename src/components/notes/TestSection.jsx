'use client';

import { useState } from 'react';
import QuizSection from './QuizSection';
import styles from './QuizSection.module.css'; // Reusing quiz styles for consistency

export default function TestSection({ questions }) {
    const [showTest, setShowTest] = useState(false);

    if (!questions || questions.length === 0) return null;

    if (!showTest) {
        return (
            <div className={styles.section} style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f8f9fa', borderRadius: '12px' }}>
                <h2>Topic Completion Test</h2>
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                    Challenge yourself with this comprehensive <strong>{questions.length}-question</strong> test.
                    <br />
                    Answering these correctly indicates mastery of the topic.
                </p>
                <button
                    className="btn"
                    onClick={() => setShowTest(true)}
                    style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem' }}
                >
                    Start Completion Test
                </button>
            </div>
        );
    }

    return (
        <section className={styles.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Completion Test</h2>
                <button
                    className="btn btn-outline"
                    onClick={() => setShowTest(false)}
                    style={{ fontSize: '0.9rem' }}
                >
                    Close Test
                </button>
            </div>
            <QuizSection questions={questions} />
        </section>
    );
}
