'use client';

import { useState } from 'react';
import styles from './QuizSection.module.css';

export default function QuizSection({ questions: initialQuestions }) {
    const [questions, setQuestions] = useState(initialQuestions);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submittedQuestions, setSubmittedQuestions] = useState({});

    // Global showResults state (optional, if we want a "Reveal All" later, but for now we focus on per-question)
    // Actually, let's keep it for the "Retry Quiz" functionality to reset everything.
    const [showAllResults, setShowAllResults] = useState(false);

    const handleSelect = (qId, optionIndex) => {
        setSelectedAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    };

    const checkQuestion = (qId) => {
        setSubmittedQuestions(prev => ({ ...prev, [qId]: true }));
    };

    const resetQuiz = () => {
        setSelectedAnswers({});
        setSubmittedQuestions({});
        setShowAllResults(false);
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            if (selectedAnswers[q.id] === q.answer) {
                score++;
            }
        });
        return score;
    };

    return (
        <div className={styles.quizContainer}>
            {questions.map((q, index) => {
                const isSubmitted = submittedQuestions[q.id] || showAllResults;
                const isCorrect = selectedAnswers[q.id] === q.answer;
                const hasSelected = selectedAnswers[q.id] !== undefined;

                return (
                    <div key={q.id || index} className={styles.questionCard}>
                        <p className={styles.questionText}><strong>{index + 1}.</strong> {q.question}</p>
                        <div className={styles.options}>
                            {q.options.map((option, oIndex) => {
                                let optionClass = styles.option;
                                if (isSubmitted) {
                                    if (oIndex === q.answer) optionClass += ` ${styles.correct}`;
                                    else if (selectedAnswers[q.id] === oIndex) optionClass += ` ${styles.incorrect}`;
                                } else {
                                    if (selectedAnswers[q.id] === oIndex) optionClass += ` ${styles.selected}`;
                                }

                                return (
                                    <button
                                        key={oIndex}
                                        className={optionClass}
                                        onClick={() => !isSubmitted && handleSelect(q.id, oIndex)}
                                        disabled={isSubmitted}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Actions for this specific question */}
                        <div style={{ marginTop: '1rem' }}>
                            {!isSubmitted ? (
                                <button
                                    className="btn btn-sm"
                                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                                    onClick={() => checkQuestion(q.id)}
                                    disabled={!hasSelected}
                                >
                                    Check Answer
                                </button>
                            ) : (
                                <div className={styles.explanation}>
                                    <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Global Actions */}
            <div className={styles.actions} style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                <div className={styles.scoreBoard}>
                    <p>Answered: {Object.keys(submittedQuestions).length} / {questions.length}</p>
                    <p>Current Score: <strong>{calculateScore()}</strong></p>
                    <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={resetQuiz}>
                        Reset Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
