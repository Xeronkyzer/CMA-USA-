'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from '@/app/mock-test/[id]/page.module.css';
import ExamTimer from './ExamTimer';

export default function MockExamClient({ exam, questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [view, setView] = useState('test'); // 'test' | 'result' | 'review'

    // Use refs for time tracking to avoid re-renders
    const startTimeRef = useRef(Date.now());
    const [timeTaken, setTimeTaken] = useState(0);

    const handleSubmit = useCallback(() => {
        const endTime = Date.now();
        const durationSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
        // Cap time taken at exam duration if auto-submitted
        const maxDuration = exam.duration * 60;
        setTimeTaken(Math.min(durationSeconds, maxDuration));

        setView('result');
        window.scrollTo(0, 0);
    }, [exam.duration]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (questionId, optionIndex) => {
        if (view !== 'test') return;
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.answer) score++;
        });
        return score;
    };

    const getTopicBreakdown = () => {
        const breakdown = {};
        questions.forEach(q => {
            const topic = q.topic || 'General';
            if (!breakdown[topic]) breakdown[topic] = { correct: 0, total: 0 };
            breakdown[topic].total++;
            if (answers[q.id] === q.answer) breakdown[topic].correct++;
        });
        return breakdown;
    };

    // RESULT VIEW
    if (view === 'result') {
        const score = calculateScore();
        const accuracy = Math.round((score / questions.length) * 100);
        const breakdown = getTopicBreakdown();
        const weakTopics = Object.entries(breakdown)
            .filter(([, data]) => (data.correct / data.total) < 0.6)
            .map(([topic]) => topic);

        return (
            <div className={`container ${styles.resultContainer}`}>
                <h1>Exam Results</h1>
                <div className={styles.scoreCard}>
                    <div className={styles.scoreCircle}>
                        <span className={styles.scoreNum}>{score}</span>
                        <span className={styles.scoreDenom}>/ {questions.length}</span>
                    </div>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Accuracy</span>
                            <span className={styles.statValue}>{accuracy}%</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Time Taken</span>
                            <span className={styles.statValue}>{formatTime(timeTaken)}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Attempted</span>
                            <span className={styles.statValue}>{Object.keys(answers).length} / {questions.length}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Status</span>
                            <span className={`${styles.statValue} ${accuracy >= 72 ? styles.pass : styles.fail}`}>
                                {accuracy >= 72 ? 'PASS' : 'NEEDS WORK'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.breakdownSection}>
                    <h2>Topic-wise Breakdown</h2>
                    <div className={styles.breakdownGrid}>
                        {Object.entries(breakdown).map(([topic, data]) => {
                            const pct = Math.round((data.correct / data.total) * 100);
                            return (
                                <div key={topic} className={styles.breakdownCard}>
                                    <h4>{topic}</h4>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progressFill} style={{ width: `${pct}%`, background: pct >= 70 ? '#28a745' : pct >= 50 ? '#ffc107' : '#dc3545' }}></div>
                                    </div>
                                    <span>{data.correct}/{data.total} ({pct}%)</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {weakTopics.length > 0 && (
                    <div className={styles.weakAreas}>
                        <h2>⚠️ Areas Needing Revision</h2>
                        <ul>
                            {weakTopics.map(t => <li key={t}>{t}</li>)}
                        </ul>
                    </div>
                )}

                <div className={styles.resultActions}>
                    <button className="btn" onClick={() => { setView('review'); setCurrentQuestion(0); }}>Review All Answers</button>
                    <Link href="/mock-test" className="btn btn-outline">Back to Mock Tests</Link>
                </div>
            </div>
        );
    }

    // TEST & REVIEW VIEW
    const activeQ = questions[currentQuestion];
    const isReview = view === 'review';

    return (
        <div className={styles.examWrapper}>
            <aside className={styles.sidebar}>
                {!isReview && (
                    <div className={styles.timerBox}>
                        <span>Time Remaining</span>
                        <ExamTimer
                            duration={exam.duration}
                            onTimeUp={handleSubmit}
                            shouldStop={view !== 'test'}
                        />
                    </div>
                )}
                {isReview && (
                    <div className={styles.reviewBanner}>
                        <strong>Review Mode</strong>
                        <span>Score: {calculateScore()}/{questions.length}</span>
                    </div>
                )}
                <div className={styles.questionPalette}>
                    {questions.map((q, idx) => {
                        let cls = styles.qBtn;
                        if (currentQuestion === idx) cls += ` ${styles.active}`;
                        else if (answers[q.id] !== undefined) cls += ` ${styles.answered}`;

                        if (isReview) {
                            if (answers[q.id] === q.answer) cls += ` ${styles.correct}`;
                            else if (answers[q.id] !== undefined) cls += ` ${styles.incorrect}`;
                            else cls += ` ${styles.skipped}`;
                        }

                        return (
                            <button key={q.id} className={cls} onClick={() => setCurrentQuestion(idx)}>
                                {idx + 1}
                            </button>
                        );
                    })}
                </div>
                {!isReview ? (
                    <button className={`${styles.submitBtn} btn`} onClick={() => { if (confirm(`Submit exam? You answered ${Object.keys(answers).length} of ${questions.length} questions.`)) handleSubmit(); }}>
                        Submit Exam
                    </button>
                ) : (
                    <div className={styles.reviewExitBox}>
                        <button className="btn btn-outline" onClick={() => setView('result')}>Back to Results</button>
                        <Link href="/mock-test" className={styles.exitLink}>Exit</Link>
                    </div>
                )}
            </aside>

            <main className={styles.mainArea}>
                <div className={styles.questionHeader}>
                    <h2>Question {currentQuestion + 1} <span className={styles.totalQ}>of {questions.length}</span></h2>
                    {activeQ.topic && <span className={styles.topicBadge}>{activeQ.topic}</span>}
                </div>

                <div className={styles.questionText}>{activeQ.question}</div>

                <div className={styles.optionsGrid}>
                    {activeQ.options.map((opt, idx) => {
                        let btnClass = styles.optionBtn;
                        if (answers[activeQ.id] === idx) btnClass += ` ${styles.selected}`;
                        if (isReview) {
                            if (idx === activeQ.answer) btnClass += ` ${styles.correctOption}`;
                            else if (answers[activeQ.id] === idx && idx !== activeQ.answer) btnClass += ` ${styles.incorrectOption}`;
                        }
                        return (
                            <button
                                key={idx}
                                className={btnClass}
                                onClick={() => handleOptionSelect(activeQ.id, idx)}
                                disabled={isReview}
                            >
                                <span className={styles.optLabel}>{String.fromCharCode(65 + idx)}</span>
                                <span>{opt}</span>
                            </button>
                        );
                    })}
                </div>

                {isReview && (
                    <div className={styles.explanationBox}>
                        <strong>{answers[activeQ.id] === activeQ.answer ? '✅ Correct!' : '❌ Incorrect.'}</strong>
                        <p>{activeQ.explanation}</p>
                    </div>
                )}

                <div className={styles.navButtons}>
                    <button
                        className="btn btn-outline"
                        onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestion === 0}
                    >
                        ← Previous
                    </button>
                    {currentQuestion < questions.length - 1 ? (
                        <button
                            className="btn"
                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                        >
                            Next →
                        </button>
                    ) : !isReview ? (
                        <button
                            className="btn"
                            onClick={() => { if (confirm(`Submit exam?`)) handleSubmit(); }}
                        >
                            Submit Exam
                        </button>
                    ) : null}
                </div>
            </main>
        </div>
    );
}
