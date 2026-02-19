'use client';

import { useState } from 'react';
import { Oswald, Great_Vibes } from 'next/font/google';
import styles from './page.module.css';

// Font configurations
const oswald = Oswald({ subsets: ['latin'], weight: ['700'], variable: '--font-oswald' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'], variable: '--font-great-vibes' });

export default function AboutPage() {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className={`${styles.container} ${oswald.variable} ${greatVibes.variable}`}>
            <div className={styles.overlay}></div>

            <div className={styles.grid}>
                {/* LEFT PAGE */}
                <div className={styles.leftPage}>
                    <h1 className={styles.bigTitle}>ABOUT HER</h1>
                </div>

                {/* RIGHT PAGE */}
                <div className={styles.rightPage}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.poem}>
                            <p>She decided to chase something big — and that alone makes my heart so proud.</p>

                            <p>It’s not just about the EXAM.<br />
                                It’s about her courage.<br />
                                Her ambition.<br />
                                The way she wants more for herself and isn’t afraid to go after it.</p>

                            <p>There’s something incredibly beautiful about a girl who dreams fearlessly.<br />
                                About a girl who wants to grow, to rise, to build a future she’s proud of.</p>

                            <p>And that girl? She’s mine.</p>

                            <p>I don’t admire her just for what she’ll achieve.<br />
                                I admire her for who she already is —<br />
                                strong, intelligent, determined, and full of quiet fire.</p>

                            <p>One day she’ll look back and realize how powerful she’s always been.<br />
                                But until then, I’ll remind her.</p>

                            <p>No matter what happens,<br />
                                no matter how long the journey feels,<br />
                                I believe in her more than she knows.</p>

                            <p>She’s not just preparing for an exam —<br />
                                she’s becoming the woman she’s meant to be.</p>

                            <p className={styles.finalLine}>And I’m lucky enough to love her through it all. ❤️✨</p>
                        </div>

                        {!revealed ? (
                            <button
                                className={styles.revealBtn}
                                onClick={() => setRevealed(true)}
                            >
                                <span className={styles.btnText}>REVEAL THE MUSE</span>
                            </button>
                        ) : (
                            <div className={`${styles.messageContent} ${styles.fadeIn}`}>
                                <div className={styles.divider}></div>
                                <h1 className={styles.signature}>SANJU &lt;3</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
