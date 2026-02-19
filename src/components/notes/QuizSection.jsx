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
                const qId = q.id || `quiz_q_${index}`;
                const isSubmitted = submittedQuestions[qId] || showAllResults;
                const isCorrect = selectedAnswers[qId] === q.answer;
                const hasSelected = selectedAnswers[qId] !== undefined;

                return (
                    <div key={qId} className={styles.questionCard}>
                        <p className={styles.questionText}><strong>{index + 1}.</strong> {q.question}</p>
                        <div className={styles.options}>
                            {q.options.map((option, oIndex) => {
                                let optionClass = styles.option;
                                if (isSubmitted) {
                                    if (oIndex === q.answer) optionClass += ` ${styles.correct}`;
                                    else if (selectedAnswers[qId] === oIndex) optionClass += ` ${styles.incorrect}`;
                                } else {
                                    if (selectedAnswers[qId] === oIndex) optionClass += ` ${styles.selected}`;
                                }

                                return (
                                    <button
                                        key={oIndex}
                                        className={optionClass}
                                        onClick={() => !isSubmitted && handleSelect(qId, oIndex)}
                                        disabled={isSubmitted}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Actions for this specific question */}
                        <div className={styles.questionActions}>
                            {!isSubmitted ? (
                                <button
                                    className={`btn ${styles.checkBtn}`}
                                    onClick={() => checkQuestion(qId)}
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
            <div className={styles.actionsBar}>
                <div className={styles.scoreBoard}>
                    <p>Answered: {Object.keys(submittedQuestions).length} / {questions.length}</p>
                    <p>Current Score: <strong>{calculateScore()}</strong></p>
                    <button className={`btn btn-outline ${styles.resetBtn}`} onClick={resetQuiz}>
                        Reset Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
