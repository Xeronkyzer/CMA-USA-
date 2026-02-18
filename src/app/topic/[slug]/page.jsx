import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import syllabusData from '@/data/syllabus.json';
import styles from './page.module.css';

// Lazy load interactive components
const QuizSection = dynamic(() => import('@/components/notes/QuizSection'), {
    loading: () => <p>Loading Quiz...</p>
});

const TestSection = dynamic(() => import('@/components/notes/TestSection'), {
    loading: () => <p>Loading Test...</p>
});

export async function generateStaticParams() {
    const topicsDir = path.join(process.cwd(), 'src/data/topics');
    if (!fs.existsSync(topicsDir)) return [];
    const filenames = fs.readdirSync(topicsDir);
    return filenames.map((name) => ({
        slug: name.replace('.json', ''),
    }));
}

async function getTopicData(slug) {
    const filePath = path.join(process.cwd(), 'src/data/topics', `${slug}.json`);
    // console.log('Checking topic file:', filePath);
    if (!fs.existsSync(filePath)) {
        // console.error('Topic file not found:', filePath);
        return null;
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

function getSyllabusSection(slug) {
    const allSections = [...syllabusData.part1.sections, ...syllabusData.part2.sections];
    return allSections.find(s => s.id === slug);
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const topic = await getTopicData(slug);

    if (!topic) {
        return {
            title: 'Topic Not Found - US CMA Prep',
            description: 'The requested topic could not be found.',
        };
    }

    return {
        title: `${topic.title} - US CMA Prep`,
        description: topic.overview || `Detailed notes and practice questions for ${topic.title}.`,
    };
}

export default async function TopicPage({ params }) {
    // Await params for Next.js 15+ compatibility
    const { slug } = await params;
    const topic = await getTopicData(slug);

    if (!topic) {
        return notFound();
    }

    const syllabusSection = getSyllabusSection(slug);

    return (
        <div className={`container ${styles.container}`}>
            <Link href="/syllabus" className={styles.backLink}>← Back to Syllabus</Link>

            <header className={styles.header}>
                <span className={styles.weightage}>Weightage: {topic.weightage}</span>
                <h1>{topic.title}</h1>
                <p className={styles.overview}>{topic.overview}</p>
                {syllabusSection && syllabusSection.examTip && (
                    <div className={styles.examTipBox}>
                        <span>💡</span>
                        <p><strong>Exam Tip: </strong>{syllabusSection.examTip}</p>
                    </div>
                )}
            </header>

            <div className={styles.contentGrid}>
                <main className={styles.mainContent}>

                    {/* Bullet Notes - Quick Reference */}
                    {topic.bulletNotes && topic.bulletNotes.length > 0 && (
                        <section className={`${styles.section} ${styles.bulletSection}`}>
                            <h2>📌 Key Points at a Glance</h2>
                            <ul className={styles.bulletNotes}>
                                {topic.bulletNotes.map((note, i) => (
                                    <li key={i}>{note}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Short Notes */}
                    {topic.shortNotes && (
                        <section className={`${styles.section} ${styles.shortNotesSection}`}>
                            <h2>📝 Short Notes</h2>
                            <p className={styles.shortNotes}>{topic.shortNotes}</p>
                        </section>
                    )}

                    {/* Concepts */}
                    <section className={styles.section}>
                        <h2>Detailed Concepts</h2>
                        {topic.concepts.map((concept, index) => (
                            <div key={index} className={styles.conceptBlock}>
                                <h3>{concept.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: concept.content }} />
                            </div>
                        ))}
                    </section>

                    {/* Formulas */}
                    <section className={styles.section}>
                        <h2>Key Formulas</h2>
                        <div className={styles.formulaGrid}>
                            {topic.formulas.map((f, i) => (
                                <div key={i} className={styles.formulaBox}>
                                    <strong>{f.name}</strong>
                                    <code>{f.formula}</code>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section className={`${styles.section} ${styles.mistakesSection}`}>
                        <h2>Common Mistakes & Exam Traps</h2>
                        <ul>
                            {topic.mistakes.map((m, i) => (
                                <li key={i}>{m}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Quiz */}
                    <section className={styles.section}>
                        <h2>Topic Quiz ({topic.quiz.length} Questions)</h2>
                        <QuizSection questions={topic.quiz} />
                    </section>

                    {/* Essay */}
                    <section className={styles.section}>
                        <h2>Essay Practice</h2>
                        <div className={styles.essayBox}>
                            <p className={styles.essayQuestion}><strong>Q: </strong>{topic.essay.question}</p>
                            <details className={styles.essayAnswer}>
                                <summary>View Model Answer Structure</summary>
                                <div dangerouslySetInnerHTML={{ __html: topic.essay.modelAnswer }} />
                            </details>
                        </div>
                    </section>

                    {/* Completion Test */}
                    {topic.test && topic.test.length > 0 && (
                        <TestSection questions={topic.test} />
                    )}

                </main>

                {/* Sidebar for Summary/Nav */}
                <aside className={styles.sidebar}>
                    <div className={styles.summaryBox}>
                        <h3>📋 One-Page Summary</h3>
                        <p>{topic.summary}</p>
                    </div>
                    {topic.shortNotes && (
                        <div className={styles.quickRef}>
                            <h3>⚡ Quick Reference</h3>
                            <p>{topic.shortNotes}</p>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
