'use client';

import { useState } from 'react';
import plansData from '@/data/plans.json';
import styles from './page.module.css';

export default function StudyPlanPage() {
    const [activePlanId, setActivePlanId] = useState('standard');
    const activePlan = plansData[activePlanId];

    return (
        <div className={`container ${styles.container}`}>
            <header className={styles.header}>
                <h1>Structure Your Preparation</h1>
                <p>Select a roadmap that fits your schedule. Consistency is key.</p>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activePlanId === 'standard' ? styles.active : ''}`}
                        onClick={() => setActivePlanId('standard')}
                    >
                        6-Month Plan
                    </button>
                    <button
                        className={`${styles.tab} ${activePlanId === 'fast' ? styles.active : ''}`}
                        onClick={() => setActivePlanId('fast')}
                    >
                        3-Month Fast Track
                    </button>
                </div>
            </header>

            <div className={styles.planContainer}>
                <div className={styles.planHeader}>
                    <h2>{activePlan.title}</h2>
                    <span className={styles.duration}>{activePlan.duration}</span>
                </div>
                <p className={styles.planDesc}>{activePlan.description}</p>

                {/* Exam Weightage Summary */}
                {activePlan.exam_details && (
                    <div className={styles.weightageCard}>
                        <h3>Exam Weightage Breakdown</h3>
                        <div className={styles.weightageGrid}>
                            <div className={styles.weightageItem}>
                                <strong>Part 1:</strong> {activePlan.exam_details.part_1_weight}
                            </div>
                            <div className={styles.weightageItem}>
                                <strong>Part 2:</strong> {activePlan.exam_details.part_2_weight}
                            </div>
                        </div>
                    </div>
                )}

                {/* Timeline Visualization */}
                <div className={styles.timeline}>
                    {activePlan.phases.map((phase, pIndex) => (
                        <div key={pIndex} className={styles.phaseGroup}>
                            <h3 className={styles.phaseTitle}>{phase.title}</h3>

                            {phase.weeks.map((week, wIndex) => (
                                <div key={wIndex} className={styles.timelineItem}>
                                    <div className={styles.timelineMarker}></div>
                                    <div className={styles.timelineContent}>
                                        <div className={styles.weekBadge}>Week {week.week}</div>
                                        <h4 className={styles.topicTitle}>{week.topic}</h4>
                                        <div className={styles.actionBox} dangerouslySetInnerHTML={{
                                            __html: week.action.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
