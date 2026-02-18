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

                <div className={`${styles.tabs} no-print`}>
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
                    <button
                        className={`${styles.tab} ${activePlanId === 'working' ? styles.active : ''}`}
                        onClick={() => setActivePlanId('working')}
                    >
                        9-Month Professional
                    </button>
                </div>

                <button className="btn btn-outline no-print" onClick={() => window.print()} style={{ marginTop: '1rem' }}>
                    Print Current Plan
                </button>
            </header>

            <div className={styles.planContainer}>
                <div className={styles.planHeader}>
                    <h2>{activePlan.title}</h2>
                    <span className={styles.duration}>{activePlan.duration}</span>
                </div>
                <p className={styles.planDesc}>{activePlan.description}</p>

                {activePlan.phases.map((phase, pIndex) => (
                    <div key={pIndex} className={styles.phase}>
                        <h3 className={styles.phaseTitle}>{phase.title}</h3>
                        <div className={styles.weekGrid}>
                            <div className={styles.gridHeader}>
                                <span>Weeks</span>
                                <span>Topic Focus</span>
                                <span>Action Items</span>
                                <span>Done?</span>
                            </div>
                            {phase.weeks.map((week, wIndex) => (
                                <div key={wIndex} className={styles.weekRow}>
                                    <div className={styles.weekCol}><strong>{week.week}</strong></div>
                                    <div className={styles.topicCol}>{week.topic}</div>
                                    <div className={styles.actionCol}>{week.action}</div>
                                    <div className={styles.checkCol}><div className={styles.checkbox}></div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${styles.printFooter} only-print`}>
                <p>US CMA Preparation Platform - Free & Structured Resource</p>
            </div>
        </div>
    );
}
