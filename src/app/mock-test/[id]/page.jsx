import examsData from '@/data/exams.json';
import MockExamClient from '@/components/mock/MockExamClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return examsData.exams.map((exam) => ({
        id: exam.id,
    }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const exam = examsData.exams.find(e => e.id === id);

    if (!exam) {
        return {
            title: 'Exam Not Found - US CMA Prep',
            description: 'The requested mock exam could not be found.',
        };
    }

    return {
        title: `${exam.title} - Mock Exam | US CMA Prep`,
        description: exam.description || `Take the ${exam.title} mock exam to test your knowledge.`,
    };
}

export default async function MockExamPage({ params }) {
    const { id } = await params;
    const exam = examsData.exams.find(e => e.id === id);
    if (!exam) return notFound();
    const questions = examsData.questions.filter(q => q.examId === id);
    if (questions.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>No Questions Available</h2>
                <p>Questions for this exam are being prepared. Check back soon!</p>
            </div>
        );
    }
    return <MockExamClient exam={exam} questions={questions} />;
}
