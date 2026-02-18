const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, 'raw_questions.txt');
const jsonPath = path.join(__dirname, 'src/data/topics/p1-s1.json');

const raw = fs.readFileSync(rawPath, 'utf8');
const p1s1 = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const questions = [];
const lines = raw.split('\n');

let currentQ = null;

const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.match(/^\d+\./)) {
        // New Question
        if (currentQ) questions.push(currentQ);
        currentQ = {
            id: 'test_' + line.match(/^\d+/)[0],
            question: line.replace(/^\d+\.\s*/, ''),
            options: [],
            answer: 0,
            explanation: ''
        };
    } else if (line.match(/^[A-D]\./)) {
        // Option
        if (currentQ) {
            currentQ.options.push(line.replace(/^[A-D]\.\s*/, '').trim());
        }
    } else if (line.match(/^Answer:\s*[A-D]/)) {
        // Answer
        if (currentQ) {
            const ansChar = line.match(/^Answer:\s*([A-D])/)[1];
            currentQ.answer = letterToIndex[ansChar];
        }
    } else if (line.startsWith('🔹')) {
        // Section header
        // Maybe add a section property to questions?
        // Or create section objects?
        // User wants "completion test", probably single flat list is fine for now but sections would be nice.
        // I'll stick to flat list but maybe prefix the question with section name?
        // Actually, just flat list is easiest for QuizSection component.
    }
}
if (currentQ) questions.push(currentQ);

console.log(`Parsed ${questions.length} questions.`);

// Add to JSON
p1s1.test = questions;

fs.writeFileSync(jsonPath, JSON.stringify(p1s1, null, 2), 'utf8');
console.log('Updated p1-s1.json with test questions.');
