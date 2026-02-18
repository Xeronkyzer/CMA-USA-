'use client';

import Link from 'next/link';
import syllabusData from '@/data/syllabus.json';
import styles from './page.module.css';

export default function SyllabusPage() {
    return (
        <div className={`container ${styles.container}`}>
            <header className={styles.header}>
                <h1>US CMA Complete Syllabus</h1>
                <p>Comprehensive breakdown of Part 1 and Part 2. Tap any topic to start studying.</p>
            </header>

            <div className={styles.partsContainer}>
                {/* Part 1 */}
                <section className={styles.partSection}>
                    <h2 className={styles.partTitle}>{syllabusData.part1.title}</h2>
                    <div className={styles.topicList}>
                        {syllabusData.part1.sections.map((section) => (
                            <div key={section.id} className={styles.topicCard}>
                                <div className={styles.topicHeader}>
                                    <Link href={`/topic/${section.id}`} className={styles.titleLink}>
                                        <h3>{section.title}</h3>
                                    </Link>
                                    <span className={styles.weightage}>{section.weightage}%</span>
                                </div>

                                <ul className={styles.subtopics}>
                                    {section.topics.map((topic, index) => (
                                        <li key={index}>{topic}</li>
                                    ))}
                                </ul>

                                {section.subtopics && (
                                    <div className={styles.detailsBlock}>
                                        <details>
                                            <summary className={styles.detailsSummary}>View Detailed Sub-Topics</summary>
                                            <div className={styles.subtopicDetails}>
                                                {Object.entries(section.subtopics).map(([category, items]) => (
                                                    <div key={category} className={styles.subtopicGroup}>
                                                        <h4>{category}</h4>
                                                        <ul>
                                                            {items.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    </div>
                                )}

                                {section.examTip && (
                                    <div className={styles.examTip}>
                                        <span className={styles.tipIcon}>💡</span>
                                        <p>{section.examTip}</p>
                                    </div>
                                )}

                                <Link href={`/topic/${section.id}`} className={styles.studyButton}>
                                    Start Studying →
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Part 2 */}
                <section className={styles.partSection}>
                    <h2 className={styles.partTitle}>{syllabusData.part2.title}</h2>
                    <div className={styles.topicList}>
                        {syllabusData.part2.sections.map((section) => (
                            <div key={section.id} className={styles.topicCard}>
                                <div className={styles.topicHeader}>
                                    <Link href={`/topic/${section.id}`} className={styles.titleLink}>
                                        <h3>{section.title}</h3>
                                    </Link>
                                    <span className={styles.weightage}>{section.weightage}%</span>
                                </div>

                                <ul className={styles.subtopics}>
                                    {section.topics.map((topic, index) => (
                                        <li key={index}>{topic}</li>
                                    ))}
                                </ul>

                                {section.subtopics && (
                                    <div className={styles.detailsBlock}>
                                        <details>
                                            <summary className={styles.detailsSummary}>View Detailed Sub-Topics</summary>
                                            <div className={styles.subtopicDetails}>
                                                {Object.entries(section.subtopics).map(([category, items]) => (
                                                    <div key={category} className={styles.subtopicGroup}>
                                                        <h4>{category}</h4>
                                                        <ul>
                                                            {items.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    </div>
                                )}

                                {section.examTip && (
                                    <div className={styles.examTip}>
                                        <span className={styles.tipIcon}>💡</span>
                                        <p>{section.examTip}</p>
                                    </div>
                                )}

                                <Link href={`/topic/${section.id}`} className={styles.studyButton}>
                                    Start Studying →
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
