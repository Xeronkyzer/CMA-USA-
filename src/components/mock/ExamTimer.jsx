'use client';

import { useState, useEffect } from 'react';

export default function ExamTimer({ duration, onTimeUp, shouldStop }) {
    const [timeLeft, setTimeLeft] = useState(duration * 60);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (shouldStop) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [shouldStop, onTimeUp]);

    return (
        <strong style={{ color: timeLeft < 300 ? '#dc3545' : 'inherit' }}>
            {formatTime(timeLeft)}
        </strong>
    );
}
